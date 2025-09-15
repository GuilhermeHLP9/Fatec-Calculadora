"use client"
import {useState} from "react";
import styles from "./page.module.css";
import Calculator from "./components/calculator";

export default function Home() {

    const [resultado, setResultado] = useState("");

    function handleClick (exp){
        if (exp === "C") {
            setResultado("");
        } else if (exp === "=") {
            if (resultado.includes("%")){
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
        }else if (exp === "+/-"){
            if (resultado){
                const invertido = (parseFloat(resultado) * -1).toString();
                setResultado(invertido);
            }
        }else if (exp === "%"){
            if (resultado){
                setResultado(resultado + "%");
            }
        }else if (exp === ","){
            if (!resultado.includes(".")){
                setResultado(resultado + ".");
            }
        }else if (exp === "←") {
            setResultado(resultado.slice(0, -1));
        }else {
                setResultado(resultado + exp);
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
                      <Calculator valor={"←"} onClick={handleClick} />
                      <Calculator valor={"C"} onClick={handleClick} />
                      <Calculator valor={"%"} onClick={handleClick} />
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
                      <Calculator valor={"+/-"} onClick={handleClick} />
                      <Calculator valor={0} onClick={handleClick} />
                      <Calculator valor={","} onClick={handleClick} />
                      <Calculator valor={"="} onClick={handleClick} />
                  </div>
              </div>
          </div>
      </>
  );
}
