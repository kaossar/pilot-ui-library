import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { cn } from "../lib/utils";

const DropdownMenuContext = React.createContext({
    open: false,
    setOpen: () => { },
    triggerRef: null,
});

export const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
            <div className="relative inline-block">{children}</div>
        </DropdownMenuContext.Provider>
    );
};

export const DropdownMenuTrigger = React.forwardRef(
    ({ className, children, asChild, ...props }, ref) => {
        const { setOpen, triggerRef } = React.useContext(DropdownMenuContext);
        const localRef = useRef(null);

        const handleClick = (e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
        };

        // Combine refs
        React.useEffect(() => {
            if (localRef.current) {
                triggerRef.current = localRef.current;
            }
        }, [triggerRef]);

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ...props,
                ref: (node) => {
                    localRef.current = node;
                    if (ref) {
                        if (typeof ref === 'function') ref(node);
                        else ref.current = node;
                    }
                },
                onClick: handleClick,
            });
        }

        return (
            <button
                ref={(node) => {
                    localRef.current = node;
                    if (ref) {
                        if (typeof ref === 'function') ref(node);
                        else ref.current = node;
                    }
                }}
                onClick={handleClick}
                className={cn("outline-none", className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef(
    ({ className, children, align = "start", side = "auto", sideOffset = 4, ...props }, ref) => {
        const { open, setOpen, triggerRef } = React.useContext(DropdownMenuContext);
        const contentRef = useRef(null);
        const [position, setPosition] = useState({ top: 0, left: 0 });

        useEffect(() => {
            if (open && contentRef.current && triggerRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const contentRect = contentRef.current.getBoundingClientRect();

                let top = triggerRect.bottom + sideOffset;
                let left = triggerRect.left;

                // Adjust horizontal alignment based on align prop
                if (align === "center") {
                    left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
                } else if (align === "end") {
                    left = triggerRect.right - contentRect.width;
                }
                // For "start", left stays at triggerRect.left

                // Calculate available space above and below
                const spaceBelow = window.innerHeight - triggerRect.bottom - 10;
                const spaceAbove = triggerRect.top - 10;
                const contentHeight = contentRect.height;

                // Determine best position based on available space and preference
                let preferBottom = side === "bottom" || side === "auto";
                let preferTop = side === "top";

                // Smart positioning: check if preferred direction has enough space
                if (preferBottom) {
                    // Prefer bottom, but check if there's enough space
                    if (contentHeight > spaceBelow && spaceAbove > spaceBelow) {
                        // Not enough space below, but more space above - flip to top
                        top = triggerRect.top - contentHeight - sideOffset;
                        console.log('DropdownMenu: Flipped to top (not enough space below)');
                    } else {
                        // Enough space below or no better option - stay bottom
                        top = triggerRect.bottom + sideOffset;
                        console.log('DropdownMenu: Opened bottom (enough space or best option)');
                    }
                } else if (preferTop) {
                    // Prefer top, but check if there's enough space
                    if (contentHeight > spaceAbove && spaceBelow > spaceAbove) {
                        // Not enough space above, but more space below - flip to bottom
                        top = triggerRect.bottom + sideOffset;
                        console.log('DropdownMenu: Flipped to bottom (not enough space above)');
                    } else {
                        // Enough space above or no better option - stay top
                        top = triggerRect.top - contentHeight - sideOffset;
                        console.log('DropdownMenu: Opened top (enough space or best option)');
                    }
                }

                // Only adjust horizontal position if it would overflow
                const padding = 10;
                if (left + contentRect.width > window.innerWidth - padding) {
                    // Would overflow right, align to right edge with padding
                    left = window.innerWidth - contentRect.width - padding;
                }
                if (left < padding) {
                    // Would overflow left, align to left edge with padding
                    left = padding;
                }

                console.log('DropdownMenu position:', {
                    side,
                    top,
                    left,
                    spaceBelow,
                    spaceAbove,
                    contentHeight,
                    triggerRect,
                    contentRect
                });
                setPosition({ top, left });
            }
        }, [open, align, side, sideOffset, triggerRef]);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (contentRef.current && !contentRef.current.contains(event.target)) {
                    if (triggerRef.current && !triggerRef.current.contains(event.target)) {
                        setOpen(false);
                    }
                }
            };

            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            }
        }, [open, setOpen, triggerRef]);

        if (!open) return null;

        const content = (
            <div
                ref={contentRef}
                className={cn(
                    "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md",
                    "animate-in fade-in-0 zoom-in-95",
                    className
                )}
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
                {...props}
            >
                {children}
            </div>
        );

        // Use portal to render outside the table container
        if (typeof document !== 'undefined') {
            return ReactDOM.createPortal(content, document.body);
        }

        return content;
    }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(
    ({ className, children, onClick, ...props }, ref) => {
        const { setOpen } = React.useContext(DropdownMenuContext);

        const handleClick = (e) => {
            if (onClick) {
                onClick(e);
            }
            setOpen(false);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                    "hover:bg-slate-100 hover:text-slate-900",
                    "focus:bg-slate-100 focus:text-slate-900",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
                )}
                onClick={handleClick}
                {...props}
            >
                {children}
            </div>
        );
    }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = React.forwardRef(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
            {...props}
        />
    )
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuLabel = React.forwardRef(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", className)}
            {...props}
        />
    )
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSub = ({ children }) => {
    return <div className="space-y-1">{children}</div>;
};
DropdownMenuSub.displayName = "DropdownMenuSub";

export const DropdownMenuSubTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none w-full",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md ml-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
