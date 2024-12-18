import "./Header.styles.css"
import { Logo } from "../logo/Logo";


interface Props {
    logo?: boolean;
    logoClassname?: string;
    title?: string;
    titleClassname?: string;
    titleStyles?: React.CSSProperties;
    actions?: React.ReactNode[];
    style?: React.CSSProperties;

}

export const Header = (props: Props) => {
    const { logo, logoClassname, title, titleStyles, titleClassname, actions, style } = props
    return(
        <div 
            className="header"
            style={style}
        >
            {logo && 
                <div className={logoClassname ?? "logo"}> 
                    <Logo /> 
                </div> 
            }
            {title && 
                <p 
                    className={titleClassname ?? "header-title"}
                    style={titleStyles}
                > 
                    {title} 
                </p>  
            }
             
            <div className="actions-container">
                {actions?.map((action, index) => (
                    <div key={index}>{action}</div>
                ))}
            </div>
        </div>
    )
   

}