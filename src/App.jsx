import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Download, Sun, Moon } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useTheme } from './theme';

export default function App() {
  const [salario, setSalario] = useState(3000);
  const [dias, setDias] = useState(15);
  const [meses, setMeses] = useState(6);
  const [anos, setAnos] = useState(2);
  const [feriasVencidas, setFeriasVencidas] = useState(true);
  const [fgtsTotal, setFgtsTotal] = useState(10000);
  const { theme, setTheme } = useTheme();

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
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('salario', salario);
  }, [salario]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calculadora Simples CLT</h1>
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-4">
          <div>
            <Label>Salário (R$)</Label>
            <Input type="number" value={salario} onChange={e => setSalario(+e.target.value)} />
          </div>
          <div>
            <Label>Dias trabalhados no mês</Label>
            <Input type="number" value={dias} onChange={e => setDias(+e.target.value)} />
          </div>
          <div>
            <Label>Meses trabalhados no ano</Label>
            <Input type="number" value={meses} onChange={e => setMeses(+e.target.value)} />
          </div>
          <div>
            <Label>Anos trabalhados</Label>
            <Input type="number" value={anos} onChange={e => setAnos(+e.target.value)} />
          </div>
          <div>
            <Label>Férias vencidas?</Label>
            <select
              value={feriasVencidas ? '1' : '0'}
              onChange={e => setFeriasVencidas(e.target.value === '1')}
              className="border rounded-md p-2"
            >
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
          <div>
            <Label>Total depositado no FGTS (R$)</Label>
            <Input type="number" value={fgtsTotal} onChange={e => setFgtsTotal(+e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card id="resultado">
        <CardContent className="p-4 space-y-2">
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
        </CardContent>
      </Card>

      <div className="text-right">
        <Button onClick={exportPDF} className="gap-2">
          <Download className="w-4 h-4" /> Exportar PDF
        </Button>
      </div>
    </div>
  );
}
