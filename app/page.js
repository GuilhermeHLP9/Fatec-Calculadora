"use client"
import {useState} from "react";
import styles from "./page.module.css";
import Calculator from "./components/calculator";

export default function Home() {

    const [resultado, setResultado] = useState("");

    function handleClick(exp) {
        setResultado(resultado + exp);
    }

    function calculoOperacao(op) {
        if (op === "=") {
            if (resultado.includes("%")) {
                const porcento = (parseFloat(resultado) / 100).toString();
                setResultado(porcento);
            }
            try {
                const calculo = resultado
                    .replace(/(\d+)%(\d+)/g, "($1/100*$2)")
                    .replace(/(\d+)%/g, "($1/100)")
                    .replace("X", "*")
                    .replace("÷", "/")
                    .replace(",", ".");
                const valor = eval(calculo)
                const formatado = Math.round(valor * 100) / 100;
                setResultado(formatado.toString());

            } catch {
                setResultado("Erro");
            }
        }
    }

    function positivoNegativo(op) {
        if (op === "+/-") {
            if (resultado) {
                const invertido = (parseFloat(resultado) * -1).toString();
                setResultado(invertido);
            }
        }
    }

    function porcentagem(op){
        if (op === "%") {
            if (resultado) {
                setResultado(resultado + "%");
            }
        }
    }

    function virgula(op){
         if (op === ",") {
            const partes = resultado.split(/[\+\-\X\÷\%]/);
            const ultimoNumero = partes[partes.length - 1];

            if (!ultimoNumero.includes(".")) {
                setResultado(resultado + ".");
            }
        }
    }

    function clearAll (op){
        if (op === "C") {
            setResultado("");
        }
    }
    function clear(op){
         if (op === "←") {
            setResultado(resultado.slice(0, -1));
        }
    }

  return (
      <>
          <div className={styles.page}>
              <div className={styles.calculadora}>
                  <div className={styles.resultado}>
                      <input
                          className={styles.resTexto}
                          value={resultado}
                          onChange={(e) => setResultado(e.target.value)}
                      />
                  </div>
                  <hr className={styles.hr} />
                  <div className={styles.teclas}>
                      <Calculator valor={"←"} onClick={clear} />
                      <Calculator valor={"C"} onClick={clearAll} />
                      <Calculator valor={"%"} onClick={porcentagem} />
                      <Calculator valor={"÷"} onClick={handleClick} />
                      <Calculator valor={7} onClick={handleClick} />
                      <Calculator valor={8} onClick={handleClick} />
                      <Calculator valor={9} onClick={handleClick} />
                      <Calculator valor={"X"} onClick={handleClick} />
                      <Calculator valor={4} onClick={handleClick} />
                      <Calculator valor={5} onClick={handleClick} />
                      <Calculator valor={6} onClick={handleClick} />
                      <Calculator valor={"-"} onClick={handleClick} />
                      <Calculator valor={1} onClick={handleClick} />
                      <Calculator valor={2} onClick={handleClick} />
                      <Calculator valor={3} onClick={handleClick} />
                      <Calculator valor={"+"} onClick={handleClick} />
                      <Calculator valor={"+/-"} onClick={positivoNegativo} />
                      <Calculator valor={0} onClick={handleClick} />
                      <Calculator valor={","} onClick={virgula} />
                      <Calculator valor={"="} onClick={calculoOperacao} />
                  </div>
              </div>
          </div>
      </>
  );
}
