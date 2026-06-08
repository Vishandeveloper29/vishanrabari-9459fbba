import { createContext, useEffect, useState } from "react";
import { Drawer as VaulHeader } from "vaul";

const DrawerContext = createContext(null);

const getDesktopState = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
};

function HeaderDrawer({
  children,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  drawerBtn,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(getDesktopState);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <VaulHeader.Root
        open={open}
        direction="top"
        onOpenChange={setOpen}
        dismissible={!isDesktop}
      >
        {drawerBtn && (
          <VaulHeader.Trigger asChild>{drawerBtn()}</VaulHeader.Trigger>
        )}

        <VaulHeader.Portal>
          <VaulHeader.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

          <VaulHeader.Content className="fixed left-0 top-0 z-50 h-fit w-full border-b border-white/10 bg-black px-5 py-6 text-white">
            {children}
          </VaulHeader.Content>
        </VaulHeader.Portal>
      </VaulHeader.Root>
    </DrawerContext.Provider>
  );
}

function DrawerContent({ children }) {
  return <>{children}</>;
}

export { HeaderDrawer, DrawerContent };
