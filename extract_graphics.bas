Option Compare Database
Option Explicit


Private Sub EnsureExists(fso As Object, dir As String)
    If dir <> "" And Not fso.FolderExists(dir) Then
        Dim parent As String
        parent = fso.GetParentFolderName(dir)
        EnsureExists fso, parent
        MkDir dir
    End If
End Sub


Public Sub DumpBobGraphics()
    Dim conn As DAO.Database
    Dim rst As DAO.Recordset
    Dim pathname As String
    Dim i As Integer
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    
    Set conn = OpenDatabase("C:\MSBOB\UPIC.MDB")
    Set rst = conn.OpenRecordset("PictureStorage")
    
    ' note: the gateway2000 version of Bob saves
    ' stuff into C:\oak as well as they used
    ' absolute paths
    ChDir "C:\extbob"
    
    For i = 1 To rst.RecordCount
        If IsNull(rst.Fields("Pathname")) Then
            MsgBox "Nothing for " & rst.Fields("Description").Value
        Else
            pathname = LCase(rst.Fields("Pathname").Value)
            EnsureExists fso, fso.GetParentFolderName(pathname)
            Open pathname For Binary Access Write As #1
            Put #1, , rst.Fields("PictureBits").Value
            Close #1
        End If
        rst.MoveNext
    Next i
    
End Sub

