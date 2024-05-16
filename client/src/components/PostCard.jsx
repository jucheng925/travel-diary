import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, lazyload, placeholder} from '@cloudinary/react';
import PostEditForm from './PostEditForm';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

const PostCard = ({post, onDelete, onEditPost}) => {
  const {currentUser} = useContext(UserContext)
  const [openEditForm, setOpenEditForm] = useState(false)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const avatarURL = (user) => cld.image(user.profile_pic).resize(thumbnail().width(50).height(50).zoom(0.85).gravity(focusOn(FocusOn.face()))).toURL()


  const handleDelete = () => {
    fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    }).then(()=> onDelete(post.id))
  }

  const handleEdit = () => {
    console.log("open edit form/overlay")
    setOpenEditForm(!openEditForm)
  }

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
        avatar={
          <Tooltip title={post.user.username}>
            <Avatar sx={{ width: 45, height: 45, bgcolor: '#97ead2' }}
            alt={post.user.username}
            src={avatarURL(post.user)} />
          </Tooltip>
        }
        title={post.title}
        subheader={displayDate} />

      <CardContent sx={{mx: 8}}>
        <AdvancedImage cldImg={cld.image(post.photo)} plugins={[lazyload(), placeholder({mode: 'blur'})]}/>
      </CardContent>
      <CardContent>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-evenly">
        <CardContent>
          <Typography>Feeling Score:</Typography>
            {ratingStars}
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
        </CardContent>

        {currentUser.id === post.user.id ?
          <CardActions >
            <IconButton aria-label="delete post" onClick={handleDelete}>
              <DeleteIcon fontSize="large" color="otherColor"/>
            </IconButton>
            <button onClick={handleEdit}>Edit</button>
            {openEditForm ? <PostEditForm post={post} onEditPost={onEditPost} setOpenEditForm={setOpenEditForm} openEditForm={openEditForm}/> : null}
          </CardActions> :
            null
        }
      </Stack>

    </Card>
  )
}

export default PostCard
