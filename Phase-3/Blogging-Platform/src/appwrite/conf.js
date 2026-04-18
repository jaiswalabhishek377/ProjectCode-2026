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
                ID.unique(), 
                {
                    title,
                    slug,
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

    async updatePost({postId,title,slug,content,featuredimgid,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                {
                    title,
                    slug,
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
        }
        catch(error) {
            console.log("Appwrite error",error);
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

    async getPosts(queries = [Query.equal("status","active")]) {
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
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }

    async getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId,
            );
        }
        catch(error) {
            console.log("Appwrite error",error);
        }
    }
}

const service = new Service();

export default service;