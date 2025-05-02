
import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

function App() {
  const [salario, setSalario] = useState(3000);
  const [dias, setDias] = useState(15);
  const [meses, setMeses] = useState(6);
  const [anos, setAnos] = useState(2);
  const [feriasVencidas, setFeriasVencidas] = useState(true);
  const [fgtsTotal, setFgtsTotal] = useState(10000);
  const [dark, setDark] = useState(false);

  const feriasProp = (salario / 12) * meses;
  const umTercoFerias = feriasProp / 3;
  const decimoTerceiro = (salario / 12) * meses;
  const saldoSalario = (salario / 30) * dias;
  const avisoPrevio = salario + ((3 * anos) * (salario / 30));
  const multaFgts = fgtsTotal * 0.4;
  const feriasVenc = feriasVencidas ? salario : 0;
  const umTercoVenc = feriasVencidas ? salario / 3 : 0;

  const total =
    saldoSalario +
    avisoPrevio +
    feriasProp +
    umTercoFerias +
    decimoTerceiro +
    multaFgts +
    feriasVenc +
    umTercoVenc;

  const exportPDF = () => {
    const element = document.getElementById('resultado');
    html2pdf().from(element).save('rescisao-clt.pdf');
  };

  const toggleTheme = () => {
    setDark(!dark);
  };

  useEffect(() => {
    localStorage.setItem('salario', salario);
  }, [salario]);

  return (
    <div className={\`\${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen p-6\`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calculadora Simples CLT</h1>
          <button onClick={toggleTheme} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
            {dark ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </div>

        <div className="grid gap-4 border rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <label>Salário (R$)
            <input type="number" value={salario} onChange={e => setSalario(+e.target.value)} className="w-full p-2 rounded border" />
          </label>
          <label>Dias trabalhados no mês
            <input type="number" value={dias} onChange={e => setDias(+e.target.value)} className="w-full p-2 rounded border" />
          </label>
          <label>Meses trabalhados no ano
            <input type="number" value={meses} onChange={e => setMeses(+e.target.value)} className="w-full p-2 rounded border" />
          </label>
          <label>Anos trabalhados
            <input type="number" value={anos} onChange={e => setAnos(+e.target.value)} className="w-full p-2 rounded border" />
          </label>
          <label>Férias vencidas?
            <select value={feriasVencidas ? '1' : '0'} onChange={e => setFeriasVencidas(e.target.value === '1')} className="w-full p-2 rounded border">
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </label>
          <label>Total FGTS depositado (R$)
            <input type="number" value={fgtsTotal} onChange={e => setFgtsTotal(+e.target.value)} className="w-full p-2 rounded border" />
          </label>
        </div>

        <div id="resultado" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-2">
          <h2 className="text-xl font-semibold">Resultado</h2>
          <p>Saldo de salário: R$ {saldoSalario.toFixed(2)}</p>
          <p>Aviso prévio: R$ {avisoPrevio.toFixed(2)}</p>
          <p>Férias proporcionais: R$ {feriasProp.toFixed(2)}</p>
          <p>1/3 sobre férias: R$ {umTercoFerias.toFixed(2)}</p>
          <p>13º proporcional: R$ {decimoTerceiro.toFixed(2)}</p>
          <p>Férias vencidas: R$ {feriasVenc.toFixed(2)}</p>
          <p>1/3 férias vencidas: R$ {umTercoVenc.toFixed(2)}</p>
          <p>Multa 40% FGTS: R$ {multaFgts.toFixed(2)}</p>
          <hr />
          <p className="font-bold text-lg">Total: R$ {total.toFixed(2)}</p>
        </div>

        <div className="text-right">
          <button onClick={exportPDF} className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
