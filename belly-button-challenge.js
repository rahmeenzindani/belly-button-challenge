// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const sampleMetadata = metadata.filter(meta => meta.id === parseInt(sample))[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    const metadataPanel = d3.select("#sample-metadata");


    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(sampleMetadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);

  });
}

function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const sampleData = samples.filter(sampleObj => sampleObj.id === sample)[0];


    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = sampleData.otu_ids;
    const otu_labels = sampleData.otu_labels;
    const sample_values = sampleData.sample_values;


    // Build a Bubble Chart
    const bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'YlGnBu'
      }
    };

    const bubbleLayout = {
      title: 'Bubble Chart of OTUs',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' },
      showlegend: false
    };

    Plotly.newPlot("bubble-chart", [bubbleTrace], bubbleLayout);

    // Render the Bubble Chart
    Plotly.newPlot('bubble-chart', [bubbleTrace], bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = top10.map(item => `OTU ${item.otu_id}`);


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const top10 = sampleData.sample_values
    .map((value, index) => ({
      otu_id: sampleData.otu_ids[index],
      sample_value: value,
      otu_label: sampleData.otu_labels[index]
    }))
    .sort((a, b) => b.sample_value - a.sample_value)  
    .slice(0, 10)  
    const reversedTop10 = top10.reverse();
  

    // Render the Bar Chart
    Plotly.newPlot('bar-chart', [barTrace], barLayout);
  }
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const sampleNames = data.names;


    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      dropdown.append("option")
        .text(sample)
        .property("value", sample);
    });


    // Get the first sample from the list
    const firstSample = sampleNames[0];
  });
}


    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

}

// Initialize the dashboard
init();
