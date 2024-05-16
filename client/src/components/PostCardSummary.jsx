import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'

const PostCardSummary = ({post}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const displayDate = post.updated_at ? `${post.post_date}, edited on ${post.updated_at}` :
  `${post.post_date}` 

  const ratingStars = []
  for (let i = 0; i < post.feeling_score; i++) {
    ratingStars.push(<StarIcon key={i}/>)
  }


  return (
    <Card sx={{width: { xs: 325, sm: 600}, bgcolor: "#ebf4f5"}}>
    <CardHeader
      titleTypographyProps={{
        fontSize: 22,
      }}
      subheaderTypographyProps={{
        fontSize: 15,
      }}
      sx={{bgcolor: "primary.main" }}
      title={post.title}
      subheader={displayDate} />

    <CardContent sx={{mx: 8}}>
      <AdvancedImage cldImg={cld.image(post.photo)} plugins={[lazyload(), placeholder({mode: 'blur'})]}/>
    </CardContent>
    <CardContent>
      <Typography variant="body2">{post.body}</Typography>
    </CardContent>

    <CardContent>
      <Stack direction="row" justifyContent="space-evenly">
        <Typography variant='h5'>{post.trip.country}{post.trip.city_state ? "," : null} {post.trip.city_state} </Typography>
        <Typography>Feeling Score:
          {ratingStars}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
  )
}

export default PostCardSummary
