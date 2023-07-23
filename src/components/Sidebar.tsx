import { forwardRef } from 'react';
import Link from 'next/link';
import { BsFillHouseDoorFill, BsFillCartFill } from "react-icons/bs"
import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
    showNav: boolean;
};

const MENU_ITEMS = [
    {
        name: 'Dashboard',
        icon: BsFillHouseDoorFill,
        path: '/'
    },
    {
        name: 'Carts',
        icon: BsFillCartFill,
        path: '/carts'
    },
];

const ACTIVE_STYLING = 'bg-purple-700 text-white';
const HOVER_STYLING = ACTIVE_STYLING.split(' ')
    .map((style) => `hover:${style}`)
    .join(' ');

const isActivePath = (path: string, currentPath: string) =>
    path === '/' ? currentPath === path : currentPath.includes(path);

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLElement, Props>(({ showNav }, ref) => {
    const router = useRouter();

    return (
        <aside ref={ref} className={'fixed w-56 h-full bg-white shadow-xl'}>
            <div className=" text-center justify-center mx-3 p-4">
                    <div className=' text-xl font-bold text-purple-700'>Dealls<span className=' text-yellow-400'>!</span></div>
                    <div className='text-xl font-bold text-purple-700'>Store</div>
                {/* <Image src={'/ferox-transparent.png'} alt={'Ferox'} width={100} height={100} /> */}
            </div>

            <ul className={'flex flex-col gap-2'}>
                {MENU_ITEMS.map(({ name, icon: Icon, path }) => (
                    <li key={name}>
                        <Link
                            href={path}
                            className={`pl-6 py-3 rounded text-center cursor-pointer flex items-center gap-2 transition-colors ease-in-out duration-150 ${HOVER_STYLING} ${isActivePath(path, router.pathname)
                                    ? ACTIVE_STYLING
                                    : 'text-purple-700'
                                }`}
                        >
                            <Icon className={'h-5 w-5'} />
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
});
