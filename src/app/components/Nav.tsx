import Link from "next/link";


export default function Nav(){
    return(
        <div>
            <Link className="block" href='/'>HOME</Link>
            <Link className="block" href='/personal'>PERSONAL</Link>
            <Link className="block" href='/webdev'>WEB DEV</Link>
            <Link className="block" href='/webdev'>SITE OF THE WEEK</Link>
        </div>
    )
}