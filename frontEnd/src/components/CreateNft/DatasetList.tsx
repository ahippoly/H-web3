import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import DatasetCard from './DatasetCard'

function DatasetList (props : { datasets: DatasetAI[], selectedDataset: DatasetAI, setSelectedModel: (dataset: DatasetAI) => void}) {
  const selectModel = (model: DatasetAI) => {
    props.setSelectedModel(model)
  }

  return (
    <Grid container spacing={2}>
      {props.datasets.map((model, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <div onClick={() => { selectModel(model) }}>
            <DatasetCard model={model} selected={props.selectedDataset.name === model.name} />
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default DatasetList
