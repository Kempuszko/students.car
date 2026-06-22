import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div className="z-10 ">
      <Link href="/">
        <Image
          width={90}
          height={90}
          src="/logo.png"
          alt="logo of studends.car"
        ></Image>
      </Link>
    </div>
  );
}

export default Logo;
