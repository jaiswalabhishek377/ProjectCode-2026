import config from "../config/config.js";
import { Client , ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredimgid,status,userid}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug, 
                {
                    title,
                    content,
                    featuredimgid,
                    status,
                    userid,
                }
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }

    async updatePost(postId, {title,content,featuredimgid,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                {
                    title,
                    content,
                    featuredimgid,
                    status,
                }
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
            );
            return true;
        }
        catch(error) {
            console.log("Appwrite error",error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }

    async getPosts(queries = [Query.equal("status", true)]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }

    //file upload
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }
    
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            );
            return true;
        }
        catch(error) {
            console.log("Appwrite error",error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) return "";
        try {
            // Constructing the URL directly based on the working example the user provided
            return `${config.appwriteUrl}/storage/buckets/${config.appwriteBucketId}/files/${fileId}/view?project=${config.appwriteProjectId}&mode=admin`;
        } catch (error) {
            console.log(error);
            return "";
        }
    }
}

const service = new Service();

export default service;