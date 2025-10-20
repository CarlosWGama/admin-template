import { Ionicons } from "../../types/ionicos";

export interface AppInputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    icon?: Ionicons
    iconColor?: string
}

export default function AppInput ({type="text", placeholder, value, label, icon, iconColor = '#000'}: AppInputProps ) {
    return (
        <div>
            <p className="ff-default ml-3">{label}</p>
            <div className="rounded-xl border-[2] border-[#dedede] p-2 flex">
                {icon && <i className={`ion-${icon} mx-2 text-[${iconColor}]`} />}
                <input type={type} placeholder={placeholder} value={value}/>
            </div>
        </div>
    )
}