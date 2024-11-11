'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PDF components
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });
const Document = dynamic(() => import('@react-pdf/renderer').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('@react-pdf/renderer').then(mod => mod.Page), { ssr: false });
const Text = dynamic(() => import('@react-pdf/renderer').then(mod => mod.Text), { ssr: false });
const View = dynamic(() => import('@react-pdf/renderer').then(mod => mod.View), { ssr: false });
const StyleSheet = dynamic(() => import('@react-pdf/renderer').then(mod => mod.StyleSheet), { ssr: false });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const PDFPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {PDFViewer && (
        <PDFViewer width="100%" height="100%">
          <MyDocument />
        </PDFViewer>
      )}
    </div>
  );
};

export default PDFPage;
