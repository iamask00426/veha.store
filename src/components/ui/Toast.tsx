// Toast component is implemented and provided via ToastContext.
// Use the useToast hook to trigger toasts from any client component.
//
// Example usage:
//   const { showToast } = useToast();
//   showToast("Added to cart!", "success");
//   showToast("Error occurred", "error");
//   showToast("Info message", "info");
//
// Import from:
export { useToast, ToastProvider } from "@/context/ToastContext";
