// export const fetchFileUpload = async (
//   file: File,
//   name: string,
//   onUploadProgress: (v: any) => void = () => {},
// ) => {
//   const { data } = await http.get('/file/upload', {
//     extension: name.match(/\.(.*)$/)![1],
//   });
//   const FileData = new FormData();
//   const { fields } = data;
//   Object.keys(fields).forEach((key) => {
//     FileData.append(key, fields[key]);
//   });
//   FileData.append('file', file);
//   await http.post(data.url, FileData, {
//     ignoreAuth: true,
//     timeout: 200000,
//     onUploadProgress,
//   });
//   return {
//     fileName: fields.key,
//     baseUrl: data.url,
//   };
// };

export const fetchFileDownload = async (pathname: string) => {
  return {
    url: pathname,
    method: 'GET',
  };
};
