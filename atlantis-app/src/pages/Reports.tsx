import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Paper, Button, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup, useTheme
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download as DownloadIcon, TableChart as TableChartIcon, BarChart as BarChartIcon, ShowChart as LineChartIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { fetchReportsData } from '../api/mockApi'; // Assuming mockApi has this function

interface ReportData {
  date: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  precipitation: number; // in mm
}

const Reports: React.FC = () => {
  const { state } = useAppContext();
  const theme = useTheme();
  const [reportsData, setReportsData] = useState<ReportData[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chart' | 'barChart' | 'table'>('chart');

  useEffect(() => {
    const getReportsData = async () => {
      const data = await fetchReportsData();
      setReportsData(data);
    };
    getReportsData();
  }, []);

  const handleDownloadReport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      exportToCsv(filteredData, 'flood_reports.csv');
    } else {
      alert(`Downloading report as ${format.toUpperCase()}... (Not implemented yet)`);
    }
  };

  const exportToCsv = (data: ReportData[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export.');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
    const fullCsv = `${headers}\n${csvContent}`;

    const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection for download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredData = reportsData.filter(report => {
    const reportDate = new Date(report.date);
    const month = (reportDate.getMonth() + 1).toString();
    const year = reportDate.getFullYear().toString();

    const monthMatch = filterMonth === 'all' || month === filterMonth;
    const yearMatch = filterYear === 'all' || year === filterYear;

    return monthMatch && yearMatch;
  });

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from(new Set(reportsData.map(data => new Date(data.date).getFullYear().toString())));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Reports</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filter Reports</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-month-label">Month</InputLabel>
            <Select
              labelId="filter-month-label"
              value={filterMonth}
              label="Month"
              onChange={(e) => setFilterMonth(e.target.value as string)}
            >
              <MenuItem value="all">All</MenuItem>
              {months.map(month => <MenuItem key={month} value={month}>{new Date(2000, parseInt(month) - 1, 1).toLocaleString('default', { month: 'long' })}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-year-label">Year</InputLabel>
            <Select
              labelId="filter-year-label"
              value={filterYear}
              label="Year"
              onChange={(e) => setFilterYear(e.target.value as string)}
            >
              <MenuItem value="all">All</MenuItem>
              {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(event, newMode) => newMode && setViewMode(newMode)}
            aria-label="report view mode"
            sx={{ ml: 'auto' }}
          >
            <ToggleButton value="table" aria-label="table view">
              <TableChartIcon />
            </ToggleButton>
            <ToggleButton value="barChart" aria-label="bar chart view">
              <BarChartIcon />
            </ToggleButton>
            <ToggleButton value="lineChart" aria-label="line chart view">
              <LineChartIcon /> {/* Assuming LineChartIcon is available or use a generic one */}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadReport('csv')}
            sx={{ mr: 1 }}
          >
            Download CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadReport('pdf')}
          >
            Download PDF
          </Button>
        </Box>

        {viewMode === 'table' ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="reports table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Risk Level</TableCell>
                  <TableCell align="right">Precipitation (mm)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow
                    key={row.date}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{row.riskLevel}</TableCell>
                    <TableCell align="right">{row.precipitation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : viewMode === 'barChart' ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precipitation" fill={theme.palette.primary.main} name="Precipitation" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="precipitation" stroke={theme.palette.primary.main} name="Precipitation" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {filteredData.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No reports found for the selected filters.
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default Reports;