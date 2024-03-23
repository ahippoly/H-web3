import DatasetList from '@/components/CreateNft/DatasetList'
import ModelList from '@/components/CreateNft/Models/ModelList'
import UserParcourStatus from '@/components/CreateNft/UserParcoursStatus'
import { datasetMocks } from '@/mocks/datasets.mock'
import { modelsMocks } from '@/mocks/models.mock'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const stepMin = 0
const stepMax = 3

function CreateNft () {
  const [activeStep, setactiveStep] = useState(0)
  const [selectedDataset, setselectedDataset] = useState<DatasetAI>({ name: '', description: '', image: '', author: '' })
  const [selectedModel, setSelectedModel] = useState<ModelAI>({ name: '', description: '', linkUrl: '', summary: '' })

  const onNext = () => {
    if (activeStep < stepMax) {
      setactiveStep(activeStep + 1)
    }
  }

  const onPrevious = () => {
    if (activeStep > stepMin) {
      setactiveStep(activeStep - 1)
    }
  }

  const selectComponent = (step: number) => {
    switch (step) {
      case 0:
        return <ModelList models={modelsMocks} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      case 1:
        return (
          <DatasetList
            setSelectedModel={setselectedDataset}
            selectedDataset={selectedDataset}
            datasets={datasetMocks}
          />
        )
      case 2:
        return <div>Step 3</div>
      case 3:
        return <div>Step 4</div>
      default:
        return <div>Step 1</div>
    }
  }

  const currentComponent = selectComponent(activeStep)

  return (
    <>
      <Typography variant='h4' align='center'>Create your NFT</Typography>
      <UserParcourStatus activeStep={activeStep} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', p: 2 }}>
        {currentComponent}
      </Box>
      <Stack direction='row' gap={2} justifyContent='space-between' mx={5}>
        <Button disabled={activeStep === stepMin} onClick={onPrevious} variant='contained'>Previous</Button>
        <Button disabled={activeStep === stepMax} onClick={onNext} variant='contained'>Next</Button>
      </Stack>
    </>
  )
}

export default CreateNft
