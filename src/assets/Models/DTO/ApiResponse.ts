
  export interface ApiResponse {
    status: number;
    message: string;
    data: any; // Now strictly typed to expect specific user data
  }
  