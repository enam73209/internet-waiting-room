module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/components/animation/DoorTransition.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DoorTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useRoomStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DoorTransition({ children }) {
    const { doorTransitionState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoomStore"])();
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full flex-1 flex flex-col bg-[#FBF9F6]",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/animation/DoorTransition.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    const isTransitioning = doorTransitionState === "transitioning";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex-1 flex flex-col bg-cream-100 relative",
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isTransitioning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.3
                    },
                    className: "fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/60 backdrop-blur-xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0.85,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        exit: {
                            scale: 1.1,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.35,
                            ease: "easeOut"
                        },
                        className: "relative w-80 h-[460px] flex items-center justify-center",
                        style: {
                            perspective: "1500px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.8
                                },
                                animate: {
                                    opacity: 0.9,
                                    scale: 1.1
                                },
                                transition: {
                                    delay: 0.25,
                                    duration: 0.6,
                                    ease: "easeOut"
                                },
                                className: "absolute inset-4 z-0 rounded-sm bg-gradient-to-r from-amber-400 via-gold-500 to-amber-500 blur-2xl"
                            }, void 0, false, {
                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-10 border-[6px] border-cream-300 rounded-xs shadow-2xl flex items-center justify-center overflow-hidden bg-cream-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-t from-amber-300/90 via-amber-100 to-white z-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/animation/DoorTransition.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            rotateY: 0
                                        },
                                        animate: {
                                            rotateY: -105
                                        },
                                        transition: {
                                            delay: 0.15,
                                            duration: 0.85,
                                            ease: [
                                                0.4,
                                                0,
                                                0.2,
                                                1
                                            ]
                                        },
                                        style: {
                                            transformOrigin: "left center",
                                            transformStyle: "preserve-3d"
                                        },
                                        className: "absolute inset-0 bg-cream-200 border-l-[3px] border-cream-300 flex flex-col items-end justify-center pr-6 shadow-md z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-3 border border-cream-300/70 rounded-xs pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-6 border border-cream-300/40 rounded-xs pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-y-12 left-8 right-12 border border-cream-300/80 bg-cream-50/20 rounded-xs shadow-inner pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative mr-1 flex flex-col items-center z-20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-10 bg-gold-600 rounded-xs border border-gold-500 shadow-xs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/animation/DoorTransition.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            rotate: 0
                                                        },
                                                        animate: {
                                                            rotate: 48
                                                        },
                                                        transition: {
                                                            duration: 0.35,
                                                            ease: "easeInOut"
                                                        },
                                                        style: {
                                                            transformOrigin: "5px 5px"
                                                        },
                                                        className: "absolute top-1 right-[-4px] w-8 h-2 bg-gold-500 rounded-sm border border-gold-600 shadow-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/animation/DoorTransition.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/animation/DoorTransition.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        transition: {
                                            delay: 0.55,
                                            duration: 0.4
                                        },
                                        className: "absolute inset-0 bg-white z-30 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/animation/DoorTransition.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0.95
                                },
                                animate: {
                                    scale: 4.8
                                },
                                transition: {
                                    delay: 0.28,
                                    duration: 0.72,
                                    ease: [
                                        0.55,
                                        0.055,
                                        0.675,
                                        0.19
                                    ]
                                },
                                className: "absolute inset-0 pointer-events-none z-40"
                            }, void 0, false, {
                                fileName: "[project]/components/animation/DoorTransition.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/animation/DoorTransition.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/animation/DoorTransition.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/animation/DoorTransition.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/animation/DoorTransition.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/animation/TransitionLink.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransitionLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDoorTransition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDoorTransition.ts [app-ssr] (ecmascript)");
"use client";
;
;
function TransitionLink({ href, children, className = "", onClick }) {
    const { transitionTo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDoorTransition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDoorTransition"])();
    const handleClick = (e)=>{
        e.preventDefault();
        if (onClick) onClick();
        transitionTo(href);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        onClick: handleClick,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/animation/TransitionLink.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/audio/SoundControl.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SoundControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useRoomStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/audioEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.mjs [app-ssr] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function SoundControl() {
    const { isMuted, setIsMuted, activeSounds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoomStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Sync the background ambient drone and chimes based on isMuted
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"]) return;
        if (!isMuted) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startDrone();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startChimes();
            // Also start any custom room sounds if they were toggled
            if (activeSounds.includes("rain")) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startRain();
            if (activeSounds.includes("fire")) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startFire();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopDrone();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopChimes();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopRain();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopFire();
        }
    }, [
        isMuted,
        activeSounds
    ]);
    const handleToggle = ()=>{
        setIsMuted(!isMuted);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleToggle,
        className: "flex items-center gap-3 px-4 py-2 rounded-full border border-cream-300 hover:border-charcoal-400 bg-cream-50/50 hover:bg-cream-50 transition-all duration-300 text-charcoal-900 group shadow-sm z-50 pointer-events-auto",
        "aria-label": isMuted ? "Unmute ambient museum sounds" : "Mute ambient museum sounds",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity",
                children: isMuted ? "Sound Off" : "Sound On"
            }, void 0, false, {
                fileName: "[project]/components/audio/SoundControl.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-4 h-4 flex items-center justify-center",
                children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                    className: "w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                }, void 0, false, {
                    fileName: "[project]/components/audio/SoundControl.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-[2px] items-end h-3 w-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                height: [
                                    "20%",
                                    "90%",
                                    "20%"
                                ]
                            },
                            transition: {
                                duration: 1.1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            className: "w-[2px] bg-charcoal-900 rounded-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/audio/SoundControl.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                height: [
                                    "40%",
                                    "100%",
                                    "40%"
                                ]
                            },
                            transition: {
                                duration: 0.9,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2
                            },
                            className: "w-[2px] bg-charcoal-900 rounded-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/audio/SoundControl.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                height: [
                                    "30%",
                                    "80%",
                                    "30%"
                                ]
                            },
                            transition: {
                                duration: 1.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.4
                            },
                            className: "w-[2px] bg-charcoal-900 rounded-xs"
                        }, void 0, false, {
                            fileName: "[project]/components/audio/SoundControl.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/audio/SoundControl.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/audio/SoundControl.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/audio/SoundControl.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/audio/SoundProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundProvider",
    ()=>SoundProvider,
    "useSoundContext",
    ()=>useSoundContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useRoomStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/audioEngine.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const SoundContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function SoundProvider({ children }) {
    const { isMuted, setIsMuted, activeSounds, toggleSound } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoomStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"]) return;
        if (!isMuted) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startDrone();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startChimes();
            // Start layer channels if they are toggled active
            if (activeSounds.includes("rain") || activeSounds.includes("synth-rain")) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startRain();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopRain();
            }
            if (activeSounds.includes("fire") || activeSounds.includes("synth-fire")) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].startFire();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopFire();
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopDrone();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopChimes();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopRain();
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].stopFire();
        }
    }, [
        isMuted,
        activeSounds
    ]);
    const toggleMute = ()=>{
        setIsMuted(!isMuted);
    };
    const toggleSoundChannel = (channel)=>{
        toggleSound(channel);
    };
    const playChime = (pitch)=>{
        if (!isMuted && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].playChimeNode(pitch);
        }
    };
    const playDoorOpen = ()=>{
        if (!isMuted && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audioEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["audioEngine"].playDoorOpen();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SoundContext.Provider, {
        value: {
            isMuted,
            activeSounds,
            toggleMute,
            toggleSoundChannel,
            playChime,
            playDoorOpen
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/audio/SoundProvider.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
function useSoundContext() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SoundContext);
    if (!ctx) {
        throw new Error("useSoundContext must be used within a SoundProvider");
    }
    return ctx;
}
}),
"[project]/components/layout/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animation$2f$TransitionLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/animation/TransitionLink.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "w-full max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between border-t border-cream-200/50 mt-16 select-none opacity-60 hover:opacity-100 transition-opacity duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[9px] uppercase tracking-widest text-charcoal-400 text-center sm:text-left mb-4 sm:mb-0",
                children: "No loops. No notifications. Just a pause."
            }, void 0, false, {
                fileName: "[project]/components/layout/Footer.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-6 font-mono text-[9px] uppercase tracking-widest text-charcoal-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animation$2f$TransitionLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/vault",
                        className: "hover:text-charcoal-900 transition-colors",
                        children: "The Archives"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Footer.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animation$2f$TransitionLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "hover:text-charcoal-900 transition-colors",
                        children: "Entrance"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Footer.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Footer.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Footer.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animation$2f$TransitionLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/animation/TransitionLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio$2f$SoundControl$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/audio/SoundControl.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function Navbar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-40 select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animation$2f$TransitionLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "group flex flex-col focus:outline-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-serif text-xl tracking-tight text-charcoal-900 group-hover:opacity-80 transition-opacity",
                        children: "The Waiting Room"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Navbar.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-60 transition-opacity",
                        children: "A digital museum"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Navbar.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Navbar.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio$2f$SoundControl$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/layout/Navbar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Navbar.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/PageTransition.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useRoomStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function PageTransition({ children }) {
    const { doorTransitionState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoomStore"])();
    const isTransitioning = doorTransitionState === "transitioning";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: isTransitioning ? {
            scale: 0.94,
            filter: "blur(3px)",
            opacity: 0.5
        } : {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1
        },
        transition: {
            duration: 0.6,
            ease: [
                0.25,
                1,
                0.5,
                1
            ]
        },
        className: "flex-1 flex flex-col w-full",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/layout/PageTransition.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/hooks/useDoorTransition.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDoorTransition",
    ()=>useDoorTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useRoomStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSound.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useDoorTransition() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setDoorTransition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useRoomStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRoomStore"])();
    const { playDoorOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const transitionTo = (href)=>{
        playDoorOpen();
        setDoorTransition("transitioning", href);
        setTimeout(()=>{
            router.push(href);
        }, 600);
        setTimeout(()=>{
            setDoorTransition("idle");
        }, 1200);
    };
    return {
        transitionTo
    };
}
}),
"[project]/hooks/useSound.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSound",
    ()=>useSound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
function useSound() {
    const { isMuted, activeSounds, toggleMute, toggleSoundChannel, playChime, playDoorOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSoundContext"])();
    return {
        isMuted,
        activeSounds,
        toggleMute,
        toggleSoundChannel,
        playChime,
        playDoorOpen
    };
}
}),
"[project]/lib/audioEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "audioEngine",
    ()=>audioEngine
]);
"use client";
class AudioEngine {
    ctx = null;
    droneNodes = null;
    rainNodes = null;
    fireNodes = null;
    chimesInterval = null;
    initCtx() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    playDoorOpen() {
        try {
            this.initCtx();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            // 1. Creaking friction sound (staccato low-pitch pulse sequence)
            const tickCount = 16;
            for(let i = 0; i < tickCount; i++){
                // Accelerating creak using exponent
                const timeOffset = Math.pow(i / tickCount, 1.8) * 0.6;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.type = "triangle";
                // Low creaky pitch
                osc.frequency.setValueAtTime(70 + Math.random() * 30, now + timeOffset);
                gain.gain.setValueAtTime(0, now + timeOffset);
                gain.gain.linearRampToValueAtTime(0.06, now + timeOffset + 0.003);
                gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.035);
                osc.start(now + timeOffset);
                osc.stop(now + timeOffset + 0.04);
            }
            // 2. Low wind gust as door swings open (lowpass filtered white noise)
            const bufferSize = this.ctx.sampleRate * 1.5;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for(let i = 0; i < bufferSize; i++){
                data[i] = Math.random() * 2 - 1;
            }
            const noiseNode = this.ctx.createBufferSource();
            noiseNode.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(120, now);
            filter.frequency.exponentialRampToValueAtTime(280, now + 0.4);
            filter.frequency.exponentialRampToValueAtTime(90, now + 1.4);
            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0, now);
            noiseGain.gain.linearRampToValueAtTime(0.1, now + 0.4);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
            noiseNode.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            noiseNode.start(now);
            noiseNode.stop(now + 1.5);
            // 3. Ambient golden chord swell (sine wave drone)
            const chord = [
                220,
                275,
                330,
                440
            ]; // A minor add9 feel
            chord.forEach((freq, idx)=>{
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + 0.15);
                gain.gain.setValueAtTime(0, now + 0.15);
                gain.gain.linearRampToValueAtTime(0.02, now + 0.5 + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + 0.15);
                osc.stop(now + 1.9);
            });
        } catch (e) {
            console.warn("AudioEngine: Door open synth failed:", e);
        }
    }
    playChimeNode(pitchFreq = 700 + Math.random() * 400) {
        try {
            this.initCtx();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            // Combine fundamental chime frequency with sharp overtone nodes
            const ratios = [
                1.0,
                1.4,
                2.0,
                2.7,
                3.6
            ];
            ratios.forEach((ratio, idx)=>{
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(pitchFreq * ratio, now);
                gain.gain.setValueAtTime(0, now);
                const peak = 0.04 / (idx + 1);
                gain.gain.linearRampToValueAtTime(peak, now + 0.015);
                // Overtones decay rapidly, leaving fundamental to sustain
                const decayTime = 2.2 / (idx * 0.6 + 1);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 3.0);
            });
        } catch (e) {
            console.warn("AudioEngine: Chime play failed:", e);
        }
    }
    startChimes() {
        this.stopChimes();
        this.playChimeNode();
        this.chimesInterval = setInterval(()=>{
            this.playChimeNode();
        }, 5000);
    }
    stopChimes() {
        if (this.chimesInterval) {
            clearInterval(this.chimesInterval);
            this.chimesInterval = null;
        }
    }
    startDrone() {
        try {
            this.initCtx();
            if (!this.ctx || this.droneNodes) return;
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc1.type = "triangle";
            osc1.frequency.setValueAtTime(110.0, now); // A2 fundamental
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(110.4, now); // slightly detuned for binaural beating
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(150, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + 2.5); // very smooth fade-in
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            osc1.start(now);
            osc2.start(now);
            this.droneNodes = {
                osc1,
                osc2,
                gain
            };
        } catch (e) {
            console.warn("AudioEngine: Drone start failed:", e);
        }
    }
    stopDrone() {
        if (this.droneNodes) {
            try {
                const { osc1, osc2, gain } = this.droneNodes;
                if (this.ctx) {
                    const now = this.ctx.currentTime;
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setValueAtTime(gain.gain.value, now);
                    gain.gain.linearRampToValueAtTime(0, now + 1.5); // slow fade-out
                    setTimeout(()=>{
                        try {
                            osc1.stop();
                            osc2.stop();
                        } catch  {}
                    }, 1600);
                }
            } catch  {}
            this.droneNodes = null;
        }
    }
    startRain() {
        try {
            this.initCtx();
            if (!this.ctx || this.rainNodes) return;
            const now = this.ctx.currentTime;
            // 2 seconds loopable noise buffer
            const bufferSize = this.ctx.sampleRate * 2.0;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for(let i = 0; i < bufferSize; i++){
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;
            const filter = this.ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(850, now);
            filter.Q.setValueAtTime(0.7, now);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.06, now + 2.0);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start(now);
            this.rainNodes = {
                noise,
                filter,
                gain
            };
        } catch (e) {
            console.warn("AudioEngine: Rain start failed:", e);
        }
    }
    stopRain() {
        if (this.rainNodes) {
            try {
                const { noise, gain } = this.rainNodes;
                if (this.ctx) {
                    const now = this.ctx.currentTime;
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setValueAtTime(gain.gain.value, now);
                    gain.gain.linearRampToValueAtTime(0, now + 1.2);
                    setTimeout(()=>{
                        try {
                            noise.stop();
                        } catch  {}
                    }, 1300);
                }
            } catch  {}
            this.rainNodes = null;
        }
    }
    startFire() {
        try {
            this.initCtx();
            if (!this.ctx || this.fireNodes) return;
            const now = this.ctx.currentTime;
            // 1. Low frequency rumble
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(45, now);
            oscGain.gain.setValueAtTime(0.03, now);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.06, now + 1.5);
            osc.connect(oscGain);
            oscGain.connect(gain);
            osc.start(now);
            // 2. High-pass random impulse clicks (crackle)
            const bufferSize = 4096;
            const scriptNode = this.ctx.createScriptProcessor(bufferSize, 0, 1);
            scriptNode.onaudioprocess = (e)=>{
                const outputBuffer = e.outputBuffer.getChannelData(0);
                for(let i = 0; i < outputBuffer.length; i++){
                    let sample = (Math.random() * 2 - 1) * 0.015; // low rumble background
                    if (Math.random() < 0.00075) {
                        // Crackle spike!
                        sample += (Math.random() > 0.5 ? 1 : -1) * 0.5;
                    }
                    outputBuffer[i] = sample;
                }
            };
            scriptNode.connect(gain);
            gain.connect(this.ctx.destination);
            this.fireNodes = {
                noise: scriptNode,
                gain,
                osc
            };
        } catch (e) {
            console.warn("AudioEngine: Fire start failed:", e);
        }
    }
    stopFire() {
        if (this.fireNodes) {
            try {
                const { noise, gain, osc } = this.fireNodes;
                if (this.ctx) {
                    const now = this.ctx.currentTime;
                    gain.gain.cancelScheduledValues(now);
                    gain.gain.setValueAtTime(gain.gain.value, now);
                    gain.gain.linearRampToValueAtTime(0, now + 1.2);
                    setTimeout(()=>{
                        try {
                            noise.disconnect();
                            osc.stop();
                        } catch  {}
                    }, 1300);
                }
            } catch  {}
            this.fireNodes = null;
        }
    }
}
const audioEngine = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
}),
"[project]/store/useRoomStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRoomStore",
    ()=>useRoomStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const useRoomStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        currentRoomIndex: 0,
        responses: {},
        completedRooms: [],
        visitorCount: 24903,
        activeSounds: [],
        unlockedAchievements: [],
        isMuted: true,
        doorTransitionState: "idle",
        transitionTargetUrl: null,
        setRoomIndex: (index)=>set({
                currentRoomIndex: index
            }),
        submitResponse: (roomId, response)=>set((state)=>({
                    responses: {
                        ...state.responses,
                        [String(roomId)]: response
                    }
                })),
        completeRoom: (roomId)=>set((state)=>{
                const nextCompleted = state.completedRooms.includes(roomId) ? state.completedRooms : [
                    ...state.completedRooms,
                    roomId
                ];
                return {
                    completedRooms: nextCompleted
                };
            }),
        randomizeVisitorCount: ()=>set((state)=>{
                const change = Math.floor(Math.random() * 31) - 15; // -15 to +15
                return {
                    visitorCount: Math.max(1000, state.visitorCount + change)
                };
            }),
        toggleSound: (soundId)=>set((state)=>{
                const active = state.activeSounds.includes(soundId) ? state.activeSounds.filter((id)=>id !== soundId) : [
                    ...state.activeSounds,
                    soundId
                ];
                return {
                    activeSounds: active
                };
            }),
        unlockAchievement: (achievementId)=>set((state)=>{
                if (state.unlockedAchievements.includes(achievementId)) return {};
                return {
                    unlockedAchievements: [
                        ...state.unlockedAchievements,
                        achievementId
                    ]
                };
            }),
        setIsMuted: (muted)=>set({
                isMuted: muted
            }),
        setDoorTransition: (doorState, targetUrl = null)=>set({
                doorTransitionState: doorState,
                transitionTargetUrl: targetUrl
            }),
        resetStore: ()=>set({
                currentRoomIndex: 0,
                responses: {},
                completedRooms: [],
                activeSounds: [],
                unlockedAchievements: [],
                doorTransitionState: "idle",
                transitionTargetUrl: null
            })
    }), {
    name: "waiting-room-store",
    partialize: (state)=>({
            currentRoomIndex: state.currentRoomIndex,
            responses: state.responses,
            completedRooms: state.completedRooms,
            visitorCount: state.visitorCount,
            unlockedAchievements: state.unlockedAchievements,
            isMuted: state.isMuted
        })
}));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1reye3n._.js.map