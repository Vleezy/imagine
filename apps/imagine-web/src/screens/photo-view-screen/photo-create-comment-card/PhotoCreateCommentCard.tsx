import { Link } from 'wouter';
import { toast } from 'react-toastify';
import { Card } from '../../../components/card/Card';
import React, { SyntheticEvent, useState } from 'react';
import { GuestGuard, UserGuard } from '@imagine-cms/web';
import { Button } from '../../../components/button/Button';
import { usePhotoCommentCreate } from '@imagine-cms/client';
import { Textarea } from '../../../components/textarea/Textarea';
import { PhotoCreateCommentCardProps } from './PhotoCreateCommentCard.types';
import { PhotoCreateCommentCardActions, PhotoCreateCommentCardForm } from './PhotoCreateCommentCard.styled';

export function PhotoCreateCommentCard({ photoID, onCreation }: PhotoCreateCommentCardProps) {
  const [comment, setComment] = useState('');

  const createComment = usePhotoCommentCreate();

  const onCreate = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newComment = await createComment.execute({ comment, photoID });
      onCreation(newComment);
    } catch (e) {
      toast.error(`Something went wrong and your comment couldn't be posted`);
    }
  }

  return (
    <Card header="Post Comment">
      <GuestGuard redirect={false}>
        <p><Link to="/login">Login</Link> to post comments</p>
      </GuestGuard>
      <UserGuard redirect={false}>
        <PhotoCreateCommentCardForm onSubmit={onCreate}>
          <Textarea value={comment} onChange={setComment} rows={10} />
          <PhotoCreateCommentCardActions>
            <Button type="submit">Post</Button>
          </PhotoCreateCommentCardActions>
        </PhotoCreateCommentCardForm>
      </UserGuard>
    </Card>
  )
}