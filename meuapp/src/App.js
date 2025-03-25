import { useState } from "react";

function App() {
    const [usuario, setUsuario] = useState("");
    const [principal, setPrincipal] = useState("");
    const [taxa, setTaxa] = useState("");
    const [tempo, setTempo] = useState("");
    const [resultado, setResultado] = useState(null);
    const [historico, setHistorico] = useState([]);

    const calcularImposto = async () => {
        const response = await fetch("http://localhost:3001/calcular", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, principal: parseFloat(principal), taxa: parseFloat(taxa), tempo: parseInt(tempo) })
        });
        const data = await response.json();
        setResultado(data.montante);
        buscarHistorico();
    };

    const buscarHistorico = async () => {
        const response = await fetch(`http://localhost:3001/historico/${usuario}`);
        const data = await response.json();
        setHistorico(data);
    };

    return (
        <div>
            <h1>Calculadora de Imposto com Juros Compostos</h1>
            <label>
                Usuário: <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </label>
            <br />
            <label>
                Principal: <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </label>
            <br />
            <label>
                Taxa de Juros (%): <input type="number" value={taxa} onChange={(e) => setTaxa(e.target.value)} />
            </label>
            <br />
            <label>
                Tempo (meses): <input type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} />
            </label>
            <br />
            <button onClick={calcularImposto}>Calcular</button>
            {resultado && <h2>Montante Final: R$ {resultado}</h2>}
            <h2>Histórico de Cálculos</h2>
            <ul>
                {historico.map((item, index) => (
                    <li key={index}>Principal: {item.principal}, Taxa: {item.taxa}%, Tempo: {item.tempo} meses, Montante: R$ {item.montante}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

