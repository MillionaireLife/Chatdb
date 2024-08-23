import React from 'react';
import { PieChart } from '@mantine/charts';

export const Chartoutput = ({ chart_data }) => {
  return (
    <PieChart withLabelsLine labelsPosition="inside" labelsType="value" withLabels data={chart_data.body} withTooltip />
  );
};
