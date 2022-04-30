import React, {Dispatch, SetStateAction} from 'react';
import './App.css';
import socketRed from './img/red-socket.png';
import socketGreen from './img/green-socket.png';
import socketBlue from './img/blue-socket.png';
import socketAny from './img/any-socket.png';
import socketLink from './img/link.png';

import {addExpression, gemStr, generateStr, movementStr, PoeStringSettings, simplify} from "./OutputString";

const maxLenght = 50;

const App = () => {

    const [rrr, setRrr] = React.useState(false);
    const [ggg, setGgg] = React.useState(false);
    const [bbb, setBbb] = React.useState(false);

    const [rrA, setRrA] = React.useState(false);
    const [ggA, setGgA] = React.useState(false);
    const [bbA, setBbA] = React.useState(false);

    const [rrg, setRrg] = React.useState(false);
    const [rrb, setRrb] = React.useState(false);
    const [ggr, setGgr] = React.useState(false);
    const [ggb, setGgb] = React.useState(false);
    const [bbr, setBbr] = React.useState(false);
    const [bbg, setBbg] = React.useState(false);

    const [rgb, setRgb] = React.useState(false);

    const [rr, setRr] = React.useState(false);
    const [gg, setGg] = React.useState(false);
    const [bb, setBb] = React.useState(false);


    const [anyThreeLink, setAnyThreeLink] = React.useState(false);
    const [movement10, setMovement10] = React.useState(false);
    const [movement15, setMovement15] = React.useState(false);

    const [lightning, setLightning] = React.useState(false);
    const [fire, setFire] = React.useState(false);
    const [cold, setCold] = React.useState(false);
    const [phys, setPhys] = React.useState(false);
    const [chaos, setChaos] = React.useState(false);
    const [anyGem, setAnyGem] = React.useState(false);

    const [copied, setCopied] = React.useState<string | undefined>(undefined);


    let settings: PoeStringSettings = {
        anyThreeLink,
        movement: {
            ten: movement10,
            fifteen: movement15,
        },
        colors: {
            rrr, ggg, bbb,
            rrA, ggA, bbA,
            ggr, ggb, rrg, rrb, bbg, bbr,
            rgb,
            rr, gg, bb
        },
        plusGems: {
            lightning,
            fire,
            cold,
            phys,
            chaos,
            any: anyGem,
        }
    };

    const result = addExpression(addExpression(
        simplify(generateStr(settings)),
        movementStr(settings)
    ), gemStr(settings));

    return (
        <div className="wrapper">
            <div className="container">
                <div className="item-wide info-header">Path of Exile - Vendor search tool</div>
                <div className="item-wide">
                    <div className="result-box">
                        <div className={result.length > maxLenght ? "result" : result === copied ? "result copied-good" : "result"}>
                            {result}
                            {result.length > maxLenght && <div className="error">Error: more than 50 characters, cannot be used in the PoE client</div>}
                            {result.length <= maxLenght && result.length > 0 && <div className="size-info">length: {result.length}</div>}
                        </div>
                        <div className="copy">
                            <button className="copy-button" onClick={() => {
                                setCopied(result);
                                navigator.clipboard.writeText(result);
                            }}>
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
                <div className="break"/>
                <div className="item">
                    <div className="column-header">Link colors (3L)</div>
                    <SocketCheckbox label="Any 3 link" value={anyThreeLink} onChange={setAnyThreeLink} link="*-*-*"/>
                    <SocketCheckbox label="r-r-*" value={rrA} onChange={setRrA}/>
                    <SocketCheckbox label="g-g-*" value={ggA} onChange={setGgA}/>
                    <SocketCheckbox label="b-b-*" value={bbA} onChange={setBbA}/>

                    <SocketCheckbox className="small-padding" label="r-r-r" value={rrr} onChange={setRrr}/>
                    <SocketCheckbox label="r-r-g" value={rrg} onChange={setRrg}/>
                    <SocketCheckbox label="r-r-b" value={rrb} onChange={setRrb}/>

                    <SocketCheckbox className="small-padding" label="g-g-g" value={ggg} onChange={setGgg}/>
                    <SocketCheckbox label="g-g-r" value={ggr} onChange={setGgr}/>
                    <SocketCheckbox label="g-g-b" value={ggb} onChange={setGgb}/>

                    <SocketCheckbox className="small-padding" label="b-b-b" value={bbb} onChange={setBbb}/>
                    <SocketCheckbox label="b-b-r" value={bbr} onChange={setBbr}/>
                    <SocketCheckbox label="b-b-g" value={bbg} onChange={setBbg}/>

                    <SocketCheckbox className="small-padding" label="r-g-b" value={rgb} onChange={setRgb}/>
                </div>
                <div className="item">
                    <div className="column-header"> Movement speed </div>
                    <Checkbox label="Movement speed (10%)" value={movement10} onChange={setMovement10}/>
                    <Checkbox label="Movement speed (15%)" value={movement15} onChange={setMovement15}/>

                    <div className="column-header small-padding"> Link colors (2L) </div>
                    <SocketCheckbox label="r-r" value={rr} onChange={setRr}/>
                    <SocketCheckbox label="g-g" value={gg} onChange={setGg}/>
                    <SocketCheckbox label="b-b" value={bb} onChange={setBb}/>

                </div>
                <div className="item">
                    <div className="column-header">
                        Misc
                    </div>
                    <Checkbox label="+1 wand (any)" value={anyGem} onChange={setAnyGem}/>
                    <Checkbox label="+1 lightning wand" value={lightning} onChange={setLightning}/>
                    <Checkbox label="+1 fire wand" value={fire} onChange={setFire}/>
                    <Checkbox label="+1 cold wand" value={cold} onChange={setCold}/>
                    <Checkbox label="+1 phys wand" value={phys} onChange={setPhys}/>
                    <Checkbox label="+1 chaos wand" value={chaos} onChange={setChaos}/>
                </div>

                <div className="break"/>

                <div className="item-wide">
                    <div className="calc-info">
                        size: {result.length} <br/>
                        <br/>
                        colors raw: {generateStr(settings)} <br/>
                        colors min: {simplify(generateStr(settings))} <br/>
                        raw c size: {generateStr(settings).length} <br/>
                        min c size: {simplify(generateStr(settings)).length}
                    </div>

                </div>
            </div>
        </div>
    )
}


interface CheckboxProps {
    label: string
    value: boolean
    onChange: Dispatch<SetStateAction<boolean>>
}

interface LinkCheckboxProps {
    label: string
    link?: string
    value: boolean
    onChange: Dispatch<SetStateAction<boolean>>
    className?: string
}

const Checkbox = (props: CheckboxProps) => {
    return (
        <div>
            <label className="checkbox">
                <input className="checkbox-input" type="checkbox" checked={props.value} onChange={e => props.onChange(e.target.checked)}/>
                <span>{props.label}</span>
            </label>
        </div>
    );
}

const SocketCheckbox = (props: LinkCheckboxProps) => {
    const els = props.link ? props.link.split("") : props.label.split("");

    return (
        <div className={props.className}>
            <label className="checkbox">
                <input className="checkbox-input" type="checkbox" checked={props.value} onChange={e => props.onChange(e.target.checked)}/>
                {els.map(c =>
                    <img className="socket-size" src={imgFromChar(c)} alt="red"/>
                )}
                <span className="link-text">
                {props.label.replaceAll("-", "")}
                </span>
            </label>
        </div>
    );
}

function imgFromChar(c: string) {
    switch (c) {
        case "r":
            return socketRed;
        case "g":
            return socketGreen;
        case "b":
            return socketBlue;
        case "-":
            return socketLink;
        default:
            return socketAny;
    }
}

export default App;
