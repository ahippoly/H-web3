import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import ModelCard from './ModelCard'

function ModelList (props : { models: ModelAI[] }) {
  return (
    <Grid container spacing={2}>
      {props.models.map((model, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <ModelCard model={model} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ModelList
