import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import {
  Briefcase,
  CalendarDays,
  Clock,
  BadgeInfo,
  DollarSign,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import AdBanner from './components/AdBanner';
import { motion } from 'framer-motion';


function App() {
  const [salario, setSalario] = useState(3000);
  const [dias, setDias] = useState(0);
  const [meses, setMeses] = useState(0);
  const [anos, setAnos] = useState(0);
  const [feriasVencidas, setFeriasVencidas] = useState(false);
  const [fgtsTotal, setFgtsTotal] = useState(0);
  const [tipoRescisao, setTipoRescisao] = useState('semJustaCausa');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = (key) => localStorage.getItem(key);
    if (saved('salario')) setSalario(+saved('salario'));
    if (saved('dias')) setDias(+saved('dias'));
    if (saved('meses')) setMeses(+saved('meses'));
    if (saved('anos')) setAnos(+saved('anos'));
    if (saved('feriasVencidas') !== null) setFeriasVencidas(saved('feriasVencidas') === 'true');
    if (saved('fgtsTotal')) setFgtsTotal(+saved('fgtsTotal'));
    if (saved('tipoRescisao')) setTipoRescisao(saved('tipoRescisao'));
    if (saved('dark') !== null) setDark(saved('dark') === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('salario', salario);
    localStorage.setItem('dias', dias);
    localStorage.setItem('meses', meses);
    localStorage.setItem('anos', anos);
    localStorage.setItem('feriasVencidas', feriasVencidas);
    localStorage.setItem('fgtsTotal', fgtsTotal);
    localStorage.setItem('tipoRescisao', tipoRescisao);
    localStorage.setItem('dark', dark);
  }, [salario, dias, meses, anos, feriasVencidas, fgtsTotal, tipoRescisao, dark]);

  const feriasProp = (salario / 12) * meses;
  const umTercoFerias = feriasProp / 3;
  const decimoTerceiro = (salario / 12) * meses;
  const saldoSalario = (salario / 30) * dias;
  const avisoPrevio =
    tipoRescisao === 'semJustaCausa'
      ? salario + 3 * anos * (salario / 30)
      : tipoRescisao === 'fimContrato'
      ? salario
      : 0;

  const multaFgts =
    tipoRescisao === 'semJustaCausa'
      ? fgtsTotal * 0.4
      : tipoRescisao === 'fimContrato'
      ? fgtsTotal * 0.2
      : 0;

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
    if (element) html2pdf().from(element).save('rescisao-clt.pdf');
  };

  const toggleTheme = () => setDark(!dark);

  return (
    <div className={`${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-all duration-300`}>
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 py-6 px-4 shadow text-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calculadora Simples CLT</h1>
          <button onClick={toggleTheme} className="p-2 rounded bg-white text-black">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 grid gap-10">
        {/* Inputs */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          {[{label: 'Salário (R$)', icon: DollarSign, value: salario, set: setSalario},
            {label: 'Dias trabalhados no mês', icon: Clock, value: dias, set: setDias},
            {label: 'Meses trabalhados no ano', icon: CalendarDays, value: meses, set: setMeses},
            {label: 'Anos trabalhados', icon: BadgeInfo, value: anos, set: setAnos},
            {label: 'Total FGTS depositado (R$)', icon: Download, value: fgtsTotal, set: setFgtsTotal}
          ].map(({label, icon: Icon, value, set}, idx) => (
            <label key={idx} className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-medium">
                <Icon className="w-4 h-4" /> {label}
              </span>
              <input
                type="number"
                value={value}
                onChange={e => set(+e.target.value)}
                className="p-2 rounded border"
              />
            </label>
          ))}

          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <DollarSign className="w-4 h-4" />
      Salário (R$)
    </span>
    <input
      type="number"
      value={salario}
      onChange={e => setSalario(+e.target.value)}
      className="w-full p-2 rounded border"
    />
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <Clock className="w-4 h-4" />
      Dias trabalhados no mês
    </span>
    <input
      type="number"
      value={dias}
      onChange={e => setDias(+e.target.value)}
      className="w-full p-2 rounded border"
    />
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <CalendarDays className="w-4 h-4" />
      Meses trabalhados no ano
    </span>
    <input
      type="number"
      value={meses}
      onChange={e => setMeses(+e.target.value)}
      className="w-full p-2 rounded border"
    />
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <BadgeInfo className="w-4 h-4" />
      Anos trabalhados
    </span>
    <input
      type="number"
      value={anos}
      onChange={e => setAnos(+e.target.value)}
      className="w-full p-2 rounded border"
    />
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <Briefcase className="w-4 h-4" />
      Tipo de rescisão
    </span>
    <select
      value={tipoRescisao}
      onChange={e => setTipoRescisao(e.target.value)}
      className="w-full p-2 rounded border"
    >
      <option value="semJustaCausa">Demissão sem justa causa</option>
      <option value="pedidoDemissao">Pedido de demissão</option>
      <option value="justaCausa">Demissão por justa causa</option>
      <option value="fimContrato">Término de contrato</option>
    </select>
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <Sun className="w-4 h-4" />
      Férias vencidas?
    </span>
    <select
      value={feriasVencidas ? '1' : '0'}
      onChange={e => setFeriasVencidas(e.target.value === '1')}
      className="w-full p-2 rounded border"
    >
      <option value="1">Sim</option>
      <option value="0">Não</option>
    </select>
  </label>

  <label className="block">
    <span className="flex items-center gap-2 font-medium mb-1">
      <Download className="w-4 h-4" />
      Total FGTS depositado (R$)
    </span>
    <input
      type="number"
      value={fgtsTotal}
      onChange={e => setFgtsTotal(+e.target.value)}
      className="w-full p-2 rounded border"
    />
  </label>
</section>

        </motion.section>

        {/* Resultados */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} id="resultado" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Resumo da Rescisão</h2>
          <ul className="space-y-1">
            <li>Saldo de salário: R$ {saldoSalario.toFixed(2)}</li>
            <li>Aviso prévio: R$ {avisoPrevio.toFixed(2)}</li>
            <li>Férias proporcionais: R$ {feriasProp.toFixed(2)}</li>
            <li>1/3 férias proporcionais: R$ {umTercoFerias.toFixed(2)}</li>
            <li>Décimo terceiro proporcional: R$ {decimoTerceiro.toFixed(2)}</li>
            <li>Multa FGTS: R$ {multaFgts.toFixed(2)}</li>
            <li>Férias vencidas: R$ {feriasVenc.toFixed(2)}</li>
            <li>1/3 férias vencidas: R$ {umTercoVenc.toFixed(2)}</li>
          </ul>
          <hr className="my-4" />
          <p className="text-xl font-bold">Total a receber: R$ {total.toFixed(2)}</p>
        </motion.section>

        {/* Botão PDF */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="text-right">
          <button onClick={exportPDF} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Baixar PDF
          </button>
        </motion.div>

        {/* Bloco de Anúncio AdSense */}
        <AdBanner />
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Calculadora CLT. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default App;
