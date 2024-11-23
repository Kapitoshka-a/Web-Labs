import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchComments, createComment, updateComment, deleteComment, fetchEstablishmentDetails} from '../api';

const CommentManager = () => {
    const { slug } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [newAuthor, setNewAuthor] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [editingCommentRating, setEditingCommentRating] = useState(5);
    const [editingCommentAuthor, setEditingCommentAuthor] = useState('');

    // Fetch comments on component load
    useEffect(() => {
        const getComments = async () => {
            const data = await fetchComments(slug);
            setComments(Array.isArray(data) ? data : []);
        };

        getComments();
    }, [slug]);

    // Function to handle creating a new comment
    const handleCreateComment = async (e) => {
        e.preventDefault();
        const commentData = {
            content: newComment,
            rating: newRating,
            author: newAuthor,
        };

        try {
            await createComment(slug, commentData);
            resetCreateForm();
            await reloadComments(); // Reload comments after creation
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    // Function to handle updating an existing comment
    const handleUpdateComment = async (e) => {
        e.preventDefault();
        const updatedCommentData = {
            content: editingCommentContent,
            rating: editingCommentRating,
            author: editingCommentAuthor
        };

        try {
            await updateComment(slug, editingCommentId, updatedCommentData);
            resetUpdateForm();
            await reloadComments(); // Reload comments after update
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    // Function to handle deleting a comment
    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(slug, commentId);
            await reloadComments(); // Reload comments after deletion
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // Function to reload comments
    const reloadComments = async () => {
        const updatedComments = await fetchComments(slug);
        setComments(Array.isArray(updatedComments) ? updatedComments : []);
    };

    // Function to reset create form fields
    const resetCreateForm = () => {
        setNewComment('');
        setNewRating(5);
        setNewAuthor('');
    };

    // Function to reset update form fields
    const resetUpdateForm = () => {
        setEditingCommentId(null);
        setEditingCommentContent('');
        setEditingCommentRating(5);
        setEditingCommentAuthor('');
    };

    // Function to set editing state
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.content);
        setEditingCommentRating(comment.rating);
        setEditingCommentAuthor(comment.author);
    };

    return (
        <div>
            <h1>Comments for Establishment: {slug}</h1>

            {/* List all comments */}
            <h2>All Comments</h2>
            <ul>
                {Array.isArray(comments) && comments.map(comment => (
                    <li key={comment.id}>
                        <p><strong>{comment.author}:</strong> {comment.content} (Rating: {comment.rating})</p>
                        <button onClick={() => handleEditComment(comment)}>Edit</button>
                        <button onClick={() => handleCommentDelete(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Form for creating a new comment */}
            <h2>Add a Comment</h2>
            <form onSubmit={handleCreateComment}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <input
                    type="number"
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
                <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {/* Form for updating an existing comment */}
            {editingCommentId && (
                <div>
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
                </div>
            )}
        </div>
    );
};

const EstablishmentDetail = () => {
    const { slug } = useParams(); // Get the slug from the URL
    const [establishment, setEstablishment] = useState({});
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null);

    // Function to fetch establishment details
    const getEstablishmentDetails = async () => {
        try {
            const data = await fetchEstablishmentDetails(slug);
            setEstablishment(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        getEstablishmentDetails(); // Fetch establishment details on mount
    }, [getEstablishmentDetails, slug]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error fetching establishment details: {error.message}</div>; // Show error message
    }

    return (
        <div>
            <h1>{establishment.name}</h1>
            <p><strong>Type:</strong> {establishment.type}</p>
            <p><strong>Description:</strong> {establishment.short_description}</p>
            <p><strong>Average Rating:</strong> {establishment.average_rating}</p>
            <p><strong>Total Comments:</strong> {establishment.total_comments_number}</p>
            <p><strong>Capacity:</strong> {establishment.capacity}</p>
            <p><strong>Contact:</strong> {establishment.work_mobile_number}</p>
            <h2>Address</h2>
            <p><strong>City:</strong> {establishment.address.city}</p>
            <p><strong>Street:</strong> {establishment.address.street}</p>
            <p><strong>Building Number:</strong> {establishment.address.build_number}</p>
            <p><strong>Price Range:</strong> {establishment.price_category?.price_range}</p>
            <p><strong>Recommended:</strong> {establishment.is_recommended ? 'Yes' : 'No'}</p>
            <CommentManager slug={slug} onCommentChange={getEstablishmentDetails} />
        </div>
    );
};

export default EstablishmentDetail;
