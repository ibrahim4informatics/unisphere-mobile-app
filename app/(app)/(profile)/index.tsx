import Post from "@/components/ui/Post";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";


const data = {
    "posts": [
        {
            "id": 31,
            "content": "Hello this is me",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-17T22:23:26.792Z",
            "created_at": "2026-03-17T22:23:26.792Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 1
            },
            "is_liked": false,
            "is_booked": true
        },
        {
            "id": 27,
            "content": "Hi this my post2",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-13T18:41:39.253Z",
            "created_at": "2026-03-13T02:14:00.387Z",
            "postMedias": [
                {
                    "id": 14,
                    "post_id": 27,
                    "type": "IMAGE",
                    "url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773427298/posts/27/attachments/s69houehaujme7ewdgrx.jpg",
                    "updated_at": "2026-03-13T18:41:39.247Z",
                    "created_at": "2026-03-13T18:41:39.247Z"
                }
            ],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 1,
                "booksmarks": 0
            },
            "is_liked": true,
            "is_booked": false
        },
        {
            "id": 24,
            "content": "Bfbfbdbdbhedhe",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:53:07.862Z",
            "created_at": "2026-03-12T22:53:07.862Z",
            "postMedias": [
                {
                    "id": 11,
                    "post_id": 24,
                    "type": "OTHER",
                    "url": "https://res.cloudinary.com/djn33vea9/raw/upload/v1773355989/posts/24/attachments/siq1mpxlkxmm4ni14ghn",
                    "updated_at": "2026-03-12T22:53:09.393Z",
                    "created_at": "2026-03-12T22:53:09.393Z"
                }
            ],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 1,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 23,
            "content": "Fbxncnxbxn",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:46:58.235Z",
            "created_at": "2026-03-12T22:46:58.235Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 22,
            "content": "Xhwhwhwbwb",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:43:51.650Z",
            "created_at": "2026-03-12T22:43:51.650Z",
            "postMedias": [
                {
                    "id": 10,
                    "post_id": 22,
                    "type": "IMAGE",
                    "url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773355433/posts/22/attachments/ojdpw6xtt4p1hmvcjzb4.jpg",
                    "updated_at": "2026-03-12T22:43:53.724Z",
                    "created_at": "2026-03-12T22:43:53.724Z"
                }
            ],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 2,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 21,
            "content": "Xhwhwhwbwb",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:43:40.946Z",
            "created_at": "2026-03-12T22:43:40.946Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 1,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 20,
            "content": "Fjcncncnxn",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:43:05.332Z",
            "created_at": "2026-03-12T22:43:05.332Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 1,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 19,
            "content": "Cbxncncbbfn",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:42:20.434Z",
            "created_at": "2026-03-12T22:42:20.434Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 18,
            "content": "Dhdhdhdhdhdhdhdh",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-12T22:41:24.928Z",
            "created_at": "2026-03-12T22:41:24.928Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 17,
            "content": "My course ",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "RESOURCE",
            "updated_at": "2026-03-12T22:37:32.129Z",
            "created_at": "2026-03-12T22:37:32.129Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 16,
            "content": "This is my new post ",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "FEED",
            "updated_at": "2026-03-12T22:36:02.931Z",
            "created_at": "2026-03-12T22:34:22.969Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 15,
            "content": "This my PDF for the revision",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "RESOURCE",
            "updated_at": "2026-03-11T23:32:00.924Z",
            "created_at": "2026-03-11T23:32:00.924Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 14,
            "content": "added course updated23dd",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "RESOURCE",
            "updated_at": "2026-03-13T18:03:06.127Z",
            "created_at": "2026-03-11T19:28:48.778Z",
            "postMedias": [
                {
                    "id": 13,
                    "post_id": 14,
                    "type": "IMAGE",
                    "url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773424066/posts/14/attachments/wb6awyi6lxj3r6yc2us3.jpg",
                    "updated_at": "2026-03-13T17:47:46.859Z",
                    "created_at": "2026-03-13T17:47:46.859Z"
                }
            ],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 13,
            "content": "Fjdkdkdkdkslskskdk",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:28:30.665Z",
            "created_at": "2026-03-11T19:28:30.665Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 12,
            "content": "Dudkdkdkskslslsldkdkdkdkdks",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:25:05.554Z",
            "created_at": "2026-03-11T19:25:05.554Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 11,
            "content": "Try things here",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:24:24.917Z",
            "created_at": "2026-03-11T19:24:24.917Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 10,
            "content": "Fjdksksksksksksk",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:23:48.912Z",
            "created_at": "2026-03-11T19:23:48.912Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 9,
            "content": "Fjdksksksksksksk",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:23:47.378Z",
            "created_at": "2026-03-11T19:23:47.378Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 8,
            "content": "This is layput to new mobile apps",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:18:43.473Z",
            "created_at": "2026-03-11T19:18:43.473Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        },
        {
            "id": 7,
            "content": "Chekc thdi post here",
            "author_id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
            "type": "QUESTION",
            "updated_at": "2026-03-11T19:17:16.787Z",
            "created_at": "2026-03-11T19:17:16.787Z",
            "postMedias": [],
            "author": {
                "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
                "first_name": "Benyahia",
                "last_name": "Ibrahim elkhalil",
                "bio": "I am student in computer science field",
                "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg",
                "email": "ibrahimelkhalilbenyahia@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$1dzuIG/FiNN1vrxLKrs7dA$2j/AHG+ff8AuyEfeoMHyFeVHwOKwfhb2VOuWJGHtFRg",
                "student_id": "202237361515",
                "role": "STUDENT",
                "status": "PENDING",
                "onboarding_completed": false,
                "id_card_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237827/unispher_id_cards/mtgkrucbzgrq5ioqbxv8.jpg",
                "deleted_at": null,
                "updated_at": "2026-03-11T14:03:48.655Z",
                "created_at": "2026-03-11T14:01:07.881Z"
            },
            "_count": {
                "comments": 0,
                "likes": 0,
                "booksmarks": 0
            },
            "is_liked": false,
            "is_booked": false
        }
    ],
    "page": 1,
    "has_more": false
}

const user = {
    "id": "2818001c-7f2b-4ecc-a763-85a2c863450b",
    "first_name": "Benyahia",
    "last_name": "Ibrahim elkhalil",
    "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1773237788/users/2818001c-7f2b-4ecc-a763-85a2c863450b/profile_pictures/uutvlbrtwrlvvnugnomp.jpg"
    , "role": "STUDENT",
    "bio": "I am student in computer science field",
    "_count": {
        "bookmarks": 1,
        "posts": 24,
        "connections": 1
    }
}

export default function UserProfileScreen() {
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]}
            className="flex-1">
            <SafeAreaView edges={["top", "left", "right"]} className="flex-1 px-6 ">

                <View className="flex-row items-center justify-between">
                    <Image
                        source={require("@/assets/images/unisphere-logo.png")}
                        style={{ width: 100, height: 100 }}
                        contentFit="contain"
                    />
                    <TouchableOpacity
                        className="mr-3 bg-white rounded-full items-center justify-center"
                        style={{
                            width: 44,
                            height: 44,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                            elevation: 3,
                        }}
                    >
                        <Feather name="bell" size={22} color="#111" />

                        <View
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#ef4444",
                            }}
                        />
                    </TouchableOpacity>
                </View>





                <KeyboardAwareFlatList

                    showsVerticalScrollIndicator={false}

                    ListHeaderComponent={() => <ProfileHeader user={user} />}
                    data={data.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Post post={item} />}

                />


            </SafeAreaView>
        </LinearGradient>
    )
}



// <View className="flex-row items-center py-6 px-2">

//     {/* Avatar with subtle border */}
//     <View className="p-[2px] rounded-full bg-blue-500">
//         <Image
//             source={{
//                 uri: "https://imgs.search.brave.com/Lmq1cCEdOkJIQS06K7YgNDCmvZluInPka6iKOxgzpVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/NTM0MzI4Mi9waG90/by9wb3J0cmFpdC1v/Zi1hbi1pbmRpYW4t/bWFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz12MEZVVWd1/UkJKTEt0c1NXMmtG/d1ZxcWllS2ZUVDdV/TEtIcGU2bjdNd3ZF/PQ"
//             }}
//             style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: 999,
//             }}
//             contentFit="cover"
//         />
//     </View>

//     {/* User Info */}
//     <View className="flex-1 px-4">

//         <Text className="text-black text-xl font-extrabold">
//             John Smith
//         </Text>

//         <Text className="text-gray-500 text-sm mt-1">
//             Computer Science Student
//         </Text>

//     </View>

//     {/* Settings Button */}
//     <TouchableOpacity
//         className="bg-gray-100 p-3 rounded-xl active:opacity-70 shadow-sm"
//     >
//         <Feather name="settings" size={20} color={Colors.gray[700]} />
//     </TouchableOpacity>

// </View>