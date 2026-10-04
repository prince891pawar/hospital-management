import { useState } from 'react'
import { Download, FileBarChart } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import RecordActionDialog from '../../components/common/RecordActionDialog.jsx'
import TrendChart from '../../components/dashboard/TrendChart.jsx'
import { appointmentTrend, chartLabels, revenueTrend } from '../../data/dashboardData.js'

const patientGrowth = [31, 36, 43, 40, 51, 57, 62, 67, 74, 79, 91, 100]
const doctorPerformance = [58, 64, 73, 61, 80, 71, 85, 78, 88, 82, 94, 100]

export default function Reports() {
  const [range, setRange] = useState('Last 12 months')
  const [selection, setSelection] = useState(null)

  return (
    <div className="page-content">
      <PageHeader title="Reports & analytics" description="Understand clinic performance and make informed decisions." action={<Button variant="secondary" icon={Download} onClick={() => setSelection({ action: 'Export', entity: 'report' })}>Export report</Button>} />
      <div className="reports-toolbar"><div className="reports-range-label"><FileBarChart size={16} /><span>Reporting period</span></div><label className="sr-only" htmlFor="report-range">Select reporting period</label><select id="report-range" className="mf-select" value={range} onChange={(event) => setRange(event.target.value)}><option>Last 12 months</option><option>Last 6 months</option><option>Last 30 days</option><option>This year</option></select></div>
      <section className="reports-grid" aria-label={`${range} reports`}>
        <TrendChart title="Revenue reports" subtitle="Collected revenue by month" value="$84,250" change="8.2%" data={revenueTrend} labels={chartLabels} color="green" />
        <TrendChart title="Appointment reports" subtitle="Completed appointments by month" value="1,284" change="12.8%" data={appointmentTrend} labels={chartLabels} />
        <TrendChart title="Patient growth" subtitle="New patient registrations" value="2,840" change="10.4%" data={patientGrowth} labels={chartLabels} color="blue" />
        <TrendChart title="Doctor performance" subtitle="Appointments completed by care team" value="92.6%" change="4.1%" data={doctorPerformance} labels={chartLabels} color="amber" />
      </section>
      <Card className="report-note"><span className="report-note-mark">i</span><p>Reports use presentation-only values in this frontend preview. Connect clinic data sources to show live metrics.</p></Card>
      <RecordActionDialog selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}