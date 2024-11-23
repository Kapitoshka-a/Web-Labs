import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments, updateComment, deleteComment } from '../api';

const CommentManager = () => {
    const { slug, id } = useParams(); // Get slug and comment ID from URL
    const [comment, setComment] = useState(null); // State for the specific comment
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [editingCommentRating, setEditingCommentRating] = useState(5);
    const [editingCommentAuthor, setEditingCommentAuthor] = useState('');

    // Fetch the specific comment on component load
    useEffect(() => {
        const getComment = async () => {
            const comments = await fetchComments(slug); // Fetch all comments for the establishment
            const foundComment = comments.find(c => c.id === Number(id)); // Find the specific comment by ID
            setComment(foundComment); // Set the found comment
            if (foundComment) {
                // Initialize the editing fields
                setEditingCommentContent(foundComment.content);
                setEditingCommentRating(foundComment.rating);
                setEditingCommentAuthor(foundComment.author);
            }
        };

        getComment();
    }, [slug, id]);

    // Function to handle updating the specific comment
    const handleUpdateComment = async (e) => {
        e.preventDefault();
        const updatedCommentData = {
            content: editingCommentContent,
            rating: editingCommentRating,
            author: editingCommentAuthor,
        };

        try {
            await updateComment(slug, id, updatedCommentData); // Update comment API call
            alert("Comment updated successfully!");
        } catch (error) {
            console.error("Error updating comment:", error);
            alert("Failed to update comment.");
        }
    };

    // Function to handle deleting the specific comment
    const handleCommentDelete = async () => {
        try {
            await deleteComment(slug, id); // Delete comment API call
            alert("Comment deleted successfully!");
            // Optionally, redirect or navigate back to the comments list
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Failed to delete comment.");
        }
    };

    if (!comment) return <p>Loading...</p>; // Loading state while fetching

    return (
        <div>
            <h1>Manage Comment for Establishment: {slug}</h1>

            {/* Display the specific comment details */}
            <h2>Comment Details</h2>
            <p><strong>{comment.author}:</strong> {comment.content} (Rating: {comment.rating})</p>

            {/* Form for updating the specific comment */}
            <h2>Update Comment</h2>
            <form onSubmit={handleUpdateComment}>
                <textarea
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                    placeholder="Update your comment"
                    required
                />
                <input
                    type="number"
                    value={editingCommentRating}
                    onChange={(e) => setEditingCommentRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
                <input
                    type="text"
                    value={editingCommentAuthor}
                    onChange={(e) => setEditingCommentAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
                <button type="submit">Update</button>
            </form>

            {/* Button to delete the specific comment */}
            <button onClick={handleCommentDelete}>Delete Comment</button>
        </div>
    );
};

export default CommentManager;
