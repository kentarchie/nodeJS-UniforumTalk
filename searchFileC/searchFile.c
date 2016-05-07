#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main( int argc,  char * argv[])
{
   char *fileName = NULL;
   char *searchString = NULL;
   FILE *file = NULL;
   char line[256];
   int opt;

   while ((opt = getopt(argc, argv, "s:f:")) != -1) {
        switch (opt) {
            case 'f':
               fileName = optarg;
               break;
            case 's':
               searchString = optarg;
               break;
        default:
            fprintf(stderr, "Usage: %s -f filename -s searchString\n", argv[0]);
            return 1;
            break;
        } // esac
   } // while

   if ( (file = fopen(fileName, "r")) == NULL ) {
      fprintf(stderr, "-f %s failed\n", fileName);
      return 1;
   }
    
   while ( fgets ( line, sizeof line, file ) != NULL ) {
        if(strstr(line, searchString) != NULL) 
            printf("%s\n", line);
   } // while
   
   return 0;
} // main
