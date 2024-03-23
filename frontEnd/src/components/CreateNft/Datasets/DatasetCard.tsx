import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import './DatasetCard.scss'
import { Stack } from '@mui/material'

export default function DatasetCard (props: { model: DatasetAI, selected: boolean }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        transitionProperty: 'transform, box-shadow',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
        outlineColor: 'text.primary',
        outlineStyle: 'solid',
        outlineWidth: 2,
        outline: props.selected ? '' : 'none',
      }} className='card-dataset'
    >
      <CardMedia
        sx={{ height: 140 }}
        image={props.model.image}
        title={props.model.name}
      />
      <CardContent>
        <Stack direction='row' gap={1} alignItems='baseline'>
          <Typography gutterBottom variant='h5'>
            {props.model.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            by {props.model.author}
          </Typography>
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          {props.model.description}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  )
}
