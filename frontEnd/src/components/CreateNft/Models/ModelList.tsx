import { Stack } from '@mui/material'
import ModelCard from './ModelCard'

function ModelList (props: { models: ModelAI[], selectedModel: ModelAI, setSelectedModel: (model: ModelAI) => void }) {
  return (
    <Stack direction='column' gap={2} p={3} flexGrow={1} justifyContent='center' minHeight={0}>
      {props.models.map((model, index) => (
        <div key={index} onClick={() => { props.setSelectedModel(model) }}>
          <ModelCard model={model} selected={props.selectedModel.name === model.name} />
        </div>
      ))}
    </Stack>
  )
}

export default ModelList
