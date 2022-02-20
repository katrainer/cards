import SuperButton from "../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {useState} from "react";
import SuperCheckbox from "../../f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";

export const Test = () => {
    const [num, setNum] = useState(1)
    const [check, setCheck] = useState(false)
    const [value, setValue] = useState('')
    return <div>
        <div>
            <h2>SuperButton</h2>
            <SuperButton
                onClick={() => setNum(num + 1)}>+1</SuperButton>
            <p>Count:{num}</p>
        </div>
        <hr/>
        <div>
            <h2>SuperCheckbox</h2>
            <SuperCheckbox
                checked={check}
                onChangeChecked={setCheck}>
                Check it
            </SuperCheckbox>
        </div>
        <hr/>
        <div>
            <h2>Super Input Text</h2>
            <SuperInputText
                value={value}
                onChangeText={setValue}
                placeholder='write'/>
        </div>
    </div>
}