import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { cn } from "../lib/utils";

const PopoverContext = React.createContext({
    open: false,
    setOpen: () => { },
    triggerRef: null,
});

export const Popover = ({ children, open: controlledOpen, onOpenChange, className }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const triggerRef = useRef(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback((newValue) => {
        console.log('Popover setOpen called with:', newValue);

        // Handle functional updates
        if (typeof newValue === 'function') {
            if (!isControlled) {
                setUncontrolledOpen((prev) => {
                    const nextValue = newValue(prev);
                    console.log('Popover: updating from', prev, 'to', nextValue);
                    if (onOpenChange) {
                        onOpenChange(nextValue);
                    }
                    return nextValue;
                });
            } else if (onOpenChange) {
                // For controlled mode, calculate new value and call onOpenChange
                const currentValue = controlledOpen;
                const nextValue = newValue(currentValue);
                onOpenChange(nextValue);
            }
        } else {
            // Handle direct value updates
            if (!isControlled) {
                setUncontrolledOpen(newValue);
            }
            if (onOpenChange) {
                onOpenChange(newValue);
            }
        }
    }, [isControlled, onOpenChange, controlledOpen]);

    return (
        <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
            <div className={cn("relative inline-block", className)}>{children}</div>
        </PopoverContext.Provider>
    );
};

export const PopoverTrigger = React.forwardRef(
    ({ className, children, asChild, onClick: externalOnClick, ...props }, ref) => {
        const { setOpen, triggerRef } = useContext(PopoverContext);
        const localRef = useRef(null);
        const isTogglingRef = useRef(false);

        const handleClick = (e) => {
            console.log('PopoverTrigger: internal clicked');
            e.stopPropagation();
            e.preventDefault();

            // Prevent multiple rapid clicks
            if (isTogglingRef.current) {
                console.log('PopoverTrigger: ignoring rapid click');
                return;
            }

            isTogglingRef.current = true;

            // Call external onClick if provided
            if (externalOnClick) {
                externalOnClick(e);
            }

            // Toggle popover
            setOpen((prev) => {
                console.log('PopoverTrigger: toggling open from', prev, 'to', !prev);
                return !prev;
            });

            // Reset toggle lock after a short delay
            setTimeout(() => {
                isTogglingRef.current = false;
            }, 200);
        };

        React.useEffect(() => {
            if (localRef.current) {
                triggerRef.current = localRef.current;
            }
        }, [triggerRef]);

        if (asChild && React.isValidElement(children)) {
            const childOnClick = children.props?.onClick;
            return React.cloneElement(children, {
                ...props,
                ref: (node) => {
                    localRef.current = node;
                    if (ref) {
                        if (typeof ref === 'function') ref(node);
                        else ref.current = node;
                    }
                },
                onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (isTogglingRef.current) return;

                    isTogglingRef.current = true;

                    if (childOnClick) childOnClick(e);
                    if (externalOnClick) externalOnClick(e);
                    setOpen((prev) => !prev);

                    setTimeout(() => {
                        isTogglingRef.current = false;
                    }, 200);
                },
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

PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef(
    ({ className, children, align = "center", side = "bottom", sideOffset = 4, ...props }, ref) => {
        const { open, setOpen, triggerRef } = useContext(PopoverContext);
        const contentRef = useRef(null);
        const [position, setPosition] = useState({ top: 0, left: 0 });

        useEffect(() => {
            if (open && contentRef.current && triggerRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const contentRect = contentRef.current.getBoundingClientRect();

                let top = 0;
                let left = 0;

                // Vertical positioning
                if (side === "bottom") {
                    top = triggerRect.bottom + sideOffset + window.scrollY;
                } else if (side === "top") {
                    top = triggerRect.top - contentRect.height - sideOffset + window.scrollY;
                }

                // Horizontal positioning
                if (align === "center") {
                    left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + window.scrollX;
                } else if (align === "start") {
                    left = triggerRect.left + window.scrollX;
                } else if (align === "end") {
                    left = triggerRect.right - contentRect.width + window.scrollX;
                }

                // Boundary check (basic)
                const padding = 10;
                if (left + contentRect.width > window.innerWidth + window.scrollX - padding) {
                    left = window.innerWidth + window.scrollX - contentRect.width - padding;
                }
                if (left < padding + window.scrollX) {
                    left = padding + window.scrollX;
                }

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
                // Utiliser 'click' au lieu de 'mousedown' pour laisser les événements
                // internes (onClick des boutons du calendrier) se déclencher complètement
                // avant de fermer le popover.
                const timeoutId = setTimeout(() => {
                    document.addEventListener("click", handleClickOutside);
                }, 10);

                return () => {
                    clearTimeout(timeoutId);
                    document.removeEventListener("click", handleClickOutside);
                };
            }
        }, [open, setOpen, triggerRef]);

        if (!open) return null;

        const content = (
            <div
                ref={contentRef}
                className={cn(
                    "fixed z-[200] min-w-[12rem] rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none animate-in fade-in-0 zoom-in-95",
                    className
                )}
                style={{ top: `${position.top - window.scrollY}px`, left: `${position.left - window.scrollX}px` }} // Use fixed positioning relative to viewport
                {...props}
            >
                {children}
            </div>
        );

        if (typeof document !== 'undefined') {
            return ReactDOM.createPortal(content, document.body);
        }

        return content;
    }
);

PopoverContent.displayName = "PopoverContent";
