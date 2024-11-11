import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, Text, View, Image, StyleSheet, pdf, Font, Svg } from '@react-pdf/renderer';

import Template from '@/public/Template';
import { ActiveUserType } from '@/components/mtt/Types/MttTypes';
import { getActiveUser } from '@/components/mtt/Api/helpers/getActiveUser';


// Define styles for the invoice PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '110%',
    opacity: 1,  // Make the background image transparent
    zIndex: -30,  // Send it to the background
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  header: {
    fontSize: 15,
    fontWeight:'extrabold',
    marginBottom: 10,
    color:"white"
  },
  slogan: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
    color:"white"
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 10,
    color:"white"
  },

  section: {
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    padding: 5,
    fontSize:12
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentTerms: {
    marginTop: 20,
    fontSize: 12,
  },
  bankDetails: {
    fontSize: 12,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

// Function that returns a PDF document structure
function InvoicePDF({
  companyName,
  slogan,
  registrationNumber,
  invoiceNumber,
  customerName,
  items,
  total,
  logoUrl,
  backgroundImageUrl,
  paymentTerms,
  bankDetails,
}: {
  companyName: string;
  slogan: string;
  registrationNumber: string;
  invoiceNumber: string;
  customerName: string;
  items: { description: string; quantity: number; price: number }[];
  total: number;
  logoUrl: string;
  backgroundImageUrl: string;
  paymentTerms: string;
  bankDetails: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
     <View style={{
        position:'relative'
     }}>


        

         <View style={{

      
zIndex:20
}}>

   {/* Logo */}
{/* <Image src={logoUrl} style={styles.logo} /> */}

{/* Company Info */}
<Text style={styles.header}>{companyName}</Text>
<Text style={styles.slogan}>{slogan}</Text>
<Text style={styles.companyInfo}>Registration Number: {registrationNumber}</Text>
<Text style={{
    marginLeft:'auto', 
    color:'gray',
    marginRight:105,
    fontSize:12
    }}>{invoiceNumber}</Text>

{/* Customer Info */}
<Text style={{marginTop:100, color:'gray', fontSize:15}}>Invoice to: {customerName}</Text>

{/* Invoice Items */}
<View style={[styles.table,{marginTop:40}]}>
<View style={[styles.tableRow, styles.tableHeader,{borderRadius:5, marginBottom:20}]}>
<Text style={{fontSize:13, color:'#1A3341', padding:8, fontWeight:'black', width:'25%'}}>Description</Text>
<Text style={{fontSize:13, color:'#1A3341', padding:8, fontWeight:'black', width:'25%'}}>Quantity</Text>
<Text style={{fontSize:13, color:'#1A3341', padding:8, fontWeight:'black', width:'25%'}}>Price</Text>
<Text style={{fontSize:13, color:'#1A3341', padding:8, fontWeight:'black', width:'25%'}}>Total</Text>

</View>
{items.map((item, index) => (
<View key={index} style={styles.tableRow}>
<Text style={styles.tableCol}>{item.description}</Text>
<Text style={styles.tableCol}>{item.quantity}</Text>
<Text style={styles.tableCol}>{item.price.toFixed(2)}</Text>
<Text style={styles.tableCol}>{(item.quantity * item.price).toFixed(2)}</Text>
</View>
))}
</View>

{/* Total */}
<Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

{/* Payment Terms and Bank Details */}
<Text style={styles.paymentTerms}>Payment Terms: {paymentTerms}</Text>
<Text style={styles.bankDetails}>Bank Details: {bankDetails}</Text>

{/* Page Number */}
<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
</View>


     </View>
     <Template  />
      </Page>
    </Document>
  );
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const logo = await getActiveUser<ActiveUserType>();

  const companyName = 'My Awesome Company';
  const customerName = 'John Doe';
  const slogan = "Best design in town";
  const registrationNumber = '123456789';
  const invoiceNumber = 'INV-1001';
  const paymentTerms = 'Payment due within 30 days';
  const bankDetails = 'Bank Name: XYZ Bank\nAccount Number: 123-456-789\nBranch Code: 001234';
  const logoUrl = logo?.activeImagePath;
  const backgroundImageUrl = 'https://example.com/background-image.png';
  const items = [
    { description: 'Item 1', quantity: 2, price: 50 },
    { description: 'Item 2', quantity: 1, price: 100 },
  ];
  const total = 200;

  // Create the invoice PDF document
  const invoiceDocument = (
    <InvoicePDF
      companyName={companyName}
      slogan={slogan}
      registrationNumber={registrationNumber}
      invoiceNumber={invoiceNumber}
      customerName={customerName}
      items={items}
      total={total}
      logoUrl={logoUrl || ''}
      backgroundImageUrl={backgroundImageUrl}
      paymentTerms={paymentTerms}
      bankDetails={bankDetails}
    />
  );

  // Render the PDF as a buffer
  const pdfBuffer = await renderPdfToBuffer(invoiceDocument);

  // Return the PDF as a response with appropriate headers to display it in the browser
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="invoice.pdf"',
    },
  });
}

// Helper function to convert the PDF document to a buffer
async function renderPdfToBuffer(document: JSX.Element): Promise<Buffer> {
  const pdfDoc = pdf(document); // Create a PDF instance
  const pdfStream = await pdfDoc.toBuffer(); // Generate a buffer from the PDF stream
  return pdfStream as any;
}
