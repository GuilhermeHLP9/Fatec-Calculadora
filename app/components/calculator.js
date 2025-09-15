import styles from "./calculator.module.css";

export default function Calculator(props) {

    return (
            <button className={styles.botoes} onClick={() => props.onClick(props.valor)}>
                {props.valor}
            </button>
    );
}
