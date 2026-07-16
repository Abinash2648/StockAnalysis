import jsPDF from "jspdf";

export const exportToPDF = (stocks) => {
  if (!stocks || stocks.length === 0) {
    alert("No data available.");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Stock Screener Report", 14, 18);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  doc.text(
    `Total Stocks: ${stocks.length}`,
    14,
    36
  );

  let y = 48;

  stocks.forEach((stock, index) => {

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);

    doc.text(
      `${index + 1}. ${stock.Symbol}`,
      14,
      y
    );

    y += 8;

    doc.setFontSize(10);

    doc.text(
      `Score: ${stock.Score}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Close: ₹${stock.Close}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `SMA50: ${stock.SMA50}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `SMA150: ${stock.SMA150}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `EMA220: ${stock.EMA220}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Trend: ${stock.Trend}`,
      20,
      y
    );

    y += 6;

    doc.text(
      `Breakout: ${stock.Breakout}`,
      20,
      y
    );

    y += 12;

  });

  doc.save("Stock_Screener_Report.pdf");
};