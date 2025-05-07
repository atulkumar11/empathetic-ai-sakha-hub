
// Mock database schema CSV generation for demo purposes

export const downloadDatabaseSchemaCSV = () => {
  // Create the CSV content
  const csvContent = `id,name,email,subscription_type,signup_date,last_login
1,John Doe,john@example.com,free,2023-05-01,2023-05-15
2,Jane Smith,jane@example.com,premium,2023-04-15,2023-05-14
3,Alice Johnson,alice@example.com,free,2023-05-10,2023-05-12
4,Bob Brown,bob@example.com,pro,2023-03-20,2023-05-16
5,Carol White,carol@example.com,premium,2023-01-05,2023-05-10

id,user_id,exam_type,score,completion_date
1,1,practice,78,2023-05-02
2,1,final,82,2023-05-10
3,2,practice,92,2023-04-20
4,3,practice,68,2023-05-11
5,4,final,88,2023-05-15

id,name,description,total_questions,difficulty,subject
1,Basic Physics,Entry level physics concepts,25,easy,Physics
2,Organic Chemistry,Advanced organic chemistry,30,hard,Chemistry
3,Human Anatomy,Comprehensive anatomy test,40,medium,Biology
4,NEET Mock Test 1,Full-length practice exam,180,medium,Mixed
5,NEET Mock Test 2,Full-length practice exam with time pressure,180,hard,Mixed
`;

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  // Support for browsers that have the download attribute
  if (navigator.msSaveBlob) { // For IE and Edge
    navigator.msSaveBlob(blob, 'prepzr_database_schema.csv');
  } else { // Other browsers
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'prepzr_database_schema.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportDatabaseSchemaToCSV = downloadDatabaseSchemaCSV;
