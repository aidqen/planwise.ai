import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png"
        alt="Planwise logo"
        {...props}
        width={50}
        height={50}
        priority
    />
)
export default Brand