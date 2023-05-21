import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// /. imports

interface propTypes {
    children: ReactNode;
}

const PortalWrapper: React.FC<propTypes> = ({ children }: any) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(
              children,
              document.getElementById('modal-portal') as HTMLElement
          )
        : null;
};

export default PortalWrapper;
