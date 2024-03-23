import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
function ModelCard (props: { model: ModelAI, selected: boolean}) {
  return (
    <Accordion
      className={`${props.selected ? ' selected' : ''}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
      >
        <Typography variant='h5'>{props.model.name}</Typography>
        <Typography variant='body2' color='text.secondary'>{props.model.summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Model url: </Typography><Typography>{props.model.linkUrl}</Typography>
        <Typography>{props.model.description}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button size='small'>Learn More</Button>
        <Button variant='contained' size='small'>Select</Button>
      </AccordionActions>
    </Accordion>
  )
}

export default ModelCard
