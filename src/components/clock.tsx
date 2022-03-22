import React from "react";

interface IClockProps {
    valorInicial : number;
}

interface IClockState {
    esCero: boolean,
    valorActual: number;
}

class Clock extends React.Component<IClockProps,IClockState> {
    constructor (props: IClockProps) {
        super(props)
        this.state = {esCero: false, valorActual: 60}
    }
    public cuentaRegresiva  = () => {
        const valor = this.props.valorInicial;
        for (var i = 0; i < valor; i++){
            this.setState({valorActual:valor-0.1});

            if (this.state.valorActual === 0){
                this.setState({esCero:true})

            }

            

        }

    }
    public render() {
        return (
            <div >{this.state.valorActual} </div>

        );
    }
}

export default Clock;