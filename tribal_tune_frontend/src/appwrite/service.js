import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, description, image, audio, category }) {
        const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteImageBucketId}/files/${image}/view?project=${conf.appwriteProjectId}&mode=admi`
        const audioUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteAudioBucketId}/files/${audio}/view?project=${conf.appwriteProjectId}&mode=admi`
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { title, description, image: imageUrl, audio: audioUrl, category }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
        }
    }


    async updatePost(slug, { title, description, image, audio }) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            if (!post) {
                throw new Error(`Post with slug ${slug} not found`);
            }

            // Extract current audio and image file names from URLs
            const currentAudioFileName = post.audio.split('/').slice(-2, -1)[0];
            const currentImageFileName = post.image.split('/').slice(-2, -1)[0];

            // If new files are provided, upload them and update the URLs
            let imageUrl = post.image;
            if (image) {
                // Delete the current image file if it exists
                if (currentImageFileName) {
                    await this.deleteFile(conf.appwriteImageBucketId,currentImageFileName);
                }
                const newImageFile = await this.uploadImageFile(image);
                imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteImageBucketId}/files/${newImageFile.$id}/view?project=${conf.appwriteProjectId}&mode=admi`
            }

            let audioUrl = post.audio;
            if (audio) {
                // Delete the current audio file if it exists
                if (currentAudioFileName) {
                    await this.deleteFile(conf.appwriteAudioBucketId,currentAudioFileName);
                }
                const newAudioFile = await this.uploadAudioFile(audio);
                audioUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteAudioBucketId}/files/${newAudioFile.$id}/view?project=${conf.appwriteProjectId}&mode=admi`
            }

            // Update the document in the database
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, description, image: imageUrl, audio: audioUrl }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
        }
    }


    async deletePost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
    
            if (!post) {
                throw new Error(`Post with slug ${slug} not found`);
            }
    
            // Extract audio and video file URLs from the post
            const audioUrl = post.audio;
            const imageUrl = post.image;
    
            // Delete the post document
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
    
            // Extract file names from the URLs
            const audioFileName = audioUrl.split('/').slice(-2, -1)[0];
            const imageFileName = imageUrl.split('/').slice(-2, -1)[0];
    
            // Delete associated files from their respective buckets
            await this.deleteFile(conf.appwriteAudioBucketId, audioFileName);
            await this.deleteFile(conf.appwriteImageBucketId, imageFileName);
    
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("category", "tabla")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async getAllPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            );
        } catch (error) {
            console.error("Appwrite service :: getAllPosts :: error", error);
            return false;
        }
    }


    async getPostsByCategory(category) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("category", category)]
            );
        } catch (error) {
            console.error("Appwrite service :: getPostsByCategory :: error", error);
            return false;
        }
    }

    async uploadImageFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteImageBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async uploadAudioFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteAudioBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(bucketId, fileName) {
        try {
            await this.bucket.deleteFile(bucketId, fileName);
            return true;
        } catch (error) {
            console.error(`Appwrite service :: deleteFile :: error deleting file ${fileName} from bucket ${bucketId}`, error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
