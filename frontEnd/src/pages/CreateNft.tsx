import ModelList from '@/components/CreateNft/ModelList'
import UserParcourStatus from '@/components/CreateNft/UserParcoursStatus'
import { models } from '@/mocks/models.mock'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const stepMin = 0
const stepMax = 3

function CreateNft () {
  const [activeStep, setactiveStep] = useState(0)

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

  return (
    <>
      <Typography variant='h4' align='center'>Create your NFT</Typography>
      <UserParcourStatus activeStep={activeStep} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <ModelList models={models} />
      </Box>
      <Stack direction='row' gap={2} justifyContent='space-between' mx={5}>
        <Button disabled={activeStep === stepMin} onClick={onPrevious} variant='contained'>Previous</Button>
        <Button disabled={activeStep === stepMax} onClick={onNext} variant='contained'>Next</Button>
      </Stack>
    </>
  )
}

export default CreateNft
