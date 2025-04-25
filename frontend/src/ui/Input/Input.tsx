import React, { FC } from "react"
import styles from "./Input.module.css"
import { TypesInput } from "../../types/enums/InputEnums"


interface IInputProps {
    initialValue: string | number
    type: TypesInput
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInputProps> = ({initialValue, type, onChange}) => {


  return (
    <div>
        <input type={type} onChange={onChange} value={initialValue} />
    </div>
  )
}

export default Input
