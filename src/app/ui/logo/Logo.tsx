import { Image } from "primereact/image"

interface Props {
    image?: string
}
export const Logo = (props: Props) => {

    const {image} = props;

    return (
        <Image src={image ?? "/img/logo.svg"} alt="logo" />
    )
}