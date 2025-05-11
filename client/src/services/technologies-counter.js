import CONFIG from "./config.js";

const colors = [
  "#0054a6", // Color primario
  "#17a2b8", // Turquesa
  "#0ca678", // Verde oscuro
  "#d63939", // Rojo
  "#f76707", // Naranja
  "#2fb344", // Verde brillante
  "#4BC0C0", // Azul claro
  "#36A2EB", // Azul más claro
  "#FFCE56", // Amarillo
  "#FF9F40", // Naranja claro
];

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${CONFIG.API_BASE_URL}/portafolio/productos-tecnologias-count/`)
    .then((response) => {
      const data = response.data;
      // console.log(data); Para verificar que los datos se obtienen correctamente

      const series = data.map((item) => item.count);
      const labels = data.map((item) => item.tecnologia);

      const chart = new ApexCharts(document.getElementById("chart-demo-pie"), {
        chart: {
          type: "donut",
          fontFamily: "inherit",
          height: 300,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: true,
          },
        },
        fill: {
          opacity: 1,
        },
        series: series,
        labels: labels,
        tooltip: {
          theme: "dark",
        },
        grid: {
          strokeDashArray: 4,
        },
        colors: colors.slice(0, series.length),
        legend: {
          show: true,
          position: "bottom",
          offsetY: 12,
          markers: {
            width: 10,
            height: 10,
            radius: 100,
          },
          itemMargin: {
            horizontal: 8,
            vertical: 8,
          },
        },
        tooltip: {
          fillSeriesColor: false,
        },
        stroke: {
          show: false,
        },
      });

      chart.render();
    })
    .catch((error) => {
      console.error("Error al obtener los productos por tecnología:", error);
    });
});
