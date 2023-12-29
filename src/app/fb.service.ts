import { Injectable } from '@angular/core';
import {onSnapshot,addDoc,doc, setDoc, getDoc, getDocs, collection, updateDoc, arrayUnion, arrayRemove, deleteDoc, query, where, Firestore} from '@angular/fire/firestore';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FBService {





  constructor(private firestore:Firestore) { }
}

